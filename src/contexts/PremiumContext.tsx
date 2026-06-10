import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import Purchases, { LOG_LEVEL, PurchasesStoreProduct } from 'react-native-purchases';
import { supabase } from '../../lib/supabase';
import {
  isBypassEmail,
  PREMIUM_ENTITLEMENT_ID,
  PREMIUM_PRODUCT_ID,
} from '../constants/premium';
import PaywallModal from '../../components/PaywallModal';
import { useAuth } from './AuthContext';

export type PaywallCopy = {
  title?: string;
  subtitle?: string;
};

type PremiumContextType = {
  isPremium: boolean;
  isLoading: boolean;
  firstUnitId: number | null;
  priceString: string | null;
  purchaseError: string | null;
  isPurchasing: boolean;
  paywallCopy: PaywallCopy | null;
  openPaywall: (copy?: PaywallCopy) => void;
  closePaywall: () => void;
  purchasePremium: () => Promise<boolean>;
  restorePurchases: () => Promise<boolean>;
  refreshPremiumStatus: () => Promise<void>;
};

const PremiumContext = createContext<PremiumContextType | null>(null);

const REVENUECAT_IOS_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY ?? '';

function readPremiumFromCustomerInfo(customerInfo: { entitlements: { active: Record<string, unknown> } }) {
  return PREMIUM_ENTITLEMENT_ID in customerInfo.entitlements.active;
}

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [firstUnitId, setFirstUnitId] = useState<number | null>(null);
  const [priceString, setPriceString] = useState<string | null>(null);
  const [product, setProduct] = useState<PurchasesStoreProduct | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [paywallVisible, setPaywallVisible] = useState(false);
  const [paywallCopy, setPaywallCopy] = useState<PaywallCopy | null>(null);
  const [purchasesReady, setPurchasesReady] = useState(false);

  const userEmail = session?.user?.email;
  const bypass = isBypassEmail(userEmail);

  useEffect(() => {
    supabase
      .from('units')
      .select('id')
      .order('order_index', { ascending: true })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data?.id) setFirstUnitId(data.id);
      });
  }, []);

  const refreshPremiumStatus = useCallback(async () => {
    if (bypass) {
      setIsPremium(true);
      return;
    }
    if (!purchasesReady) return;
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      setIsPremium(readPremiumFromCustomerInfo(customerInfo));
    } catch {
      // keep previous state
    }
  }, [bypass, purchasesReady]);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      setIsLoading(true);
      setPurchaseError(null);

      if (bypass) {
        setIsPremium(true);
        setIsLoading(false);
        return;
      }

      /** Expo Go'da native IAP yok; configure hata verir — sessizce atla */
      if (Constants.appOwnership === 'expo') {
        setIsPremium(false);
        setIsLoading(false);
        return;
      }

      if (Platform.OS !== 'ios' || !REVENUECAT_IOS_KEY) {
        setIsPremium(false);
        setIsLoading(false);
        return;
      }

      try {
        Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO);
        await Purchases.configure({
          apiKey: REVENUECAT_IOS_KEY,
          appUserID: session?.user?.id ?? undefined,
        });

        if (cancelled) return;
        setPurchasesReady(true);

        const customerInfo = await Purchases.getCustomerInfo();
        if (cancelled) return;

        setIsPremium(readPremiumFromCustomerInfo(customerInfo));

        let lifetimeProduct: PurchasesStoreProduct | null = null;
        try {
          const offerings = await Purchases.getOfferings();
          const packages = offerings.current?.availablePackages ?? [];
          const fromOffering = packages.find(
            (pkg) => pkg.product.identifier === PREMIUM_PRODUCT_ID,
          );
          lifetimeProduct = fromOffering?.product ?? null;
        } catch {
          /* offerings yoksa products dene */
        }

        if (!lifetimeProduct) {
          const products = await Purchases.getProducts([PREMIUM_PRODUCT_ID]);
          lifetimeProduct = products[0] ?? null;
        }

        if (cancelled) return;
        setProduct(lifetimeProduct);
        setPriceString(lifetimeProduct?.priceString ?? null);
      } catch {
        if (!cancelled) setIsPremium(false);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [session?.user?.id, bypass]);

  const purchasePremium = useCallback(async (): Promise<boolean> => {
    setPurchaseError(null);

    if (bypass) {
      setIsPremium(true);
      return true;
    }

    if (!product) {
      setPurchaseError(
        'Mağaza ürünü yüklenemedi. TestFlight’ta Sandbox test hesabıyla App Store’a giriş yap veya biraz sonra tekrar dene.',
      );
      return false;
    }

    setIsPurchasing(true);
    try {
      const { customerInfo } = await Purchases.purchaseStoreProduct(product);
      const premium = readPremiumFromCustomerInfo(customerInfo);
      setIsPremium(premium);
      if (premium) setPaywallVisible(false);
      return premium;
    } catch (err: unknown) {
      const error = err as { userCancelled?: boolean; message?: string; code?: string };
      if (!error.userCancelled) {
        const raw = error.message ?? '';
        const friendly =
          raw.includes('STORE_PROBLEM') || raw.includes('Unable to connect')
            ? 'App Store’a şu an ulaşılamıyor. İnternetini kontrol et veya Sandbox hesabınla tekrar dene.'
            : raw || 'Satın alma tamamlanamadı. Sandbox test hesabı kullanıyorsan App Store ayarlarından çıkış yapıp tekrar dene.';
        setPurchaseError(friendly);
      }
      return false;
    } finally {
      setIsPurchasing(false);
    }
  }, [bypass, product]);

  const restorePurchases = useCallback(async (): Promise<boolean> => {
    setPurchaseError(null);

    if (bypass) {
      setIsPremium(true);
      return true;
    }

    if (!purchasesReady) {
      setPurchaseError('Satın alma servisi hazır değil.');
      return false;
    }

    setIsPurchasing(true);
    try {
      const customerInfo = await Purchases.restorePurchases();
      const premium = readPremiumFromCustomerInfo(customerInfo);
      setIsPremium(premium);
      if (premium) setPaywallVisible(false);
      if (!premium) setPurchaseError('Geri yüklenecek satın alma bulunamadı.');
      return premium;
    } catch (err: unknown) {
      const error = err as { message?: string };
      setPurchaseError(error.message ?? 'Geri yükleme başarısız.');
      return false;
    } finally {
      setIsPurchasing(false);
    }
  }, [bypass, purchasesReady]);

  const openPaywall = useCallback((copy?: PaywallCopy) => {
    setPaywallCopy(copy ?? null);
    setPaywallVisible(true);
  }, []);
  const closePaywall = useCallback(() => {
    setPaywallVisible(false);
    setPurchaseError(null);
    setPaywallCopy(null);
  }, []);

  return (
    <PremiumContext.Provider
      value={{
        isPremium,
        isLoading,
        firstUnitId,
        priceString,
        purchaseError,
        isPurchasing,
        paywallCopy,
        openPaywall,
        closePaywall,
        purchasePremium,
        restorePurchases,
        refreshPremiumStatus,
      }}
    >
      {children}
      <PaywallModal
        visible={paywallVisible}
        title={paywallCopy?.title}
        subtitle={paywallCopy?.subtitle}
        priceString={priceString}
        purchaseError={purchaseError}
        isPurchasing={isPurchasing}
        onClose={closePaywall}
        onPurchase={purchasePremium}
        onRestore={restorePurchases}
      />
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const ctx = useContext(PremiumContext);
  if (!ctx) throw new Error('usePremium must be used within PremiumProvider');
  return ctx;
}
