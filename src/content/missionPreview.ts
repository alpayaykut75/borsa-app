import type { MissionMetadata } from '../../components/MissionStep';

/**
 * YALNIZCA GELİŞTİRME SÜRÜMÜ İÇİN önizleme görevleri.
 *
 * Testerlardaki eski build'ler `mission` adım tipini tanımadığı için görevler,
 * yeni build yayına çıkana kadar canlı veritabanına eklenmez. Bu sırada dev
 * sürümünde (__DEV__ && MISSION_PREVIEW) aşağıdaki görevler derse 14. adım olarak
 * enjekte edilir. Görevler DB'ye eklendikten sonra bu dosya silinebilir.
 */
export const MISSION_PREVIEW: Record<number, { title: string; metadata: MissionMetadata }> = {
  // Seviye 1 · Ders 1 — Şirket ve Ortaklık
  27: {
    title: 'Sıra Sende',
    metadata: {
      variant: 'pick_reason',
      category: 'Düşünce',
      prompt: 'Mahallede üç işletme ortak arıyor. Sen hangisine ortak olurdun?',
      options: [
        {
          id: 'firin',
          title: 'Mahalle Fırını',
          desc: 'Her sabah kuyruk var. Sahibi ikinci şube açmak istiyor.',
          icon: 'storefront-outline',
        },
        {
          id: 'kirtasiye',
          title: 'Kırtasiye',
          desc: 'Okul açılışında çok yoğun, yazın sakin.',
          icon: 'book-outline',
        },
        {
          id: 'kafe',
          title: 'Yeni Kafe',
          desc: 'Geçen ay açıldı. Sahibi 10 yıl başka bir kafede çalışmış.',
          icon: 'cafe-outline',
        },
      ],
      reason_prompt: 'Neden? En önemli sebebini seç:',
      reasons: ['Düzenli müşterisi var', 'Büyüme hikâyesi', 'Sahibine güveniyorum', 'Rakibi az'],
      feedback:
        'Doğru ya da yanlış cevap yok, ortak. Sadece unutma: {secim} iyi bir yıl geçirirse kârından payını alırsın; kötü bir yıl geçirirse o da senin kaybın olur.',
    },
  },
  // Seviye 1 · Ders 2 — Ortak mı, Alacaklı mı?
  28: {
    title: 'Sıra Sende',
    metadata: {
      variant: 'scenario',
      category: 'Düşünce',
      prompt: 'Fırın 100.000 ₺ istiyor. Sana iki teklif var. Hangisini seçerdin?',
      options: [
        {
          id: 'borc',
          title: 'Borç ver',
          desc: '1 yıl sonra faiziyle geri al (%40)',
          icon: 'document-text-outline',
          outcome_label: 'Borç veren',
        },
        {
          id: 'ortak',
          title: 'Ortak ol',
          desc: "Fırının %10'u kalıcı olarak senin",
          icon: 'people-outline',
          outcome_label: 'Ortak',
        },
      ],
      scenario_prompt: 'Şimdi bir yıl ileri saralım. Fırının yılı nasıl geçti?',
      scenarios: [
        {
          id: 'iyi',
          label: 'İyi yıl',
          outcomes: {
            borc: {
              value: '+140.000 ₺',
              note: 'Paranı faiziyle geri aldın. Fırının iyi yılından fazlası sana düşmez.',
            },
            ortak: {
              value: '+60.000 ₺ kâr payı',
              note: "600.000 ₺ kârın %10'u senin. Üstelik payın hâlâ elinde.",
            },
          },
        },
        {
          id: 'kotu',
          label: 'Kötü yıl',
          outcomes: {
            borc: { value: '+140.000 ₺', note: 'Kâr olmasa da fırın borcunu ödemek zorunda.' },
            ortak: { value: '0 ₺', note: 'Kâr yoksa kâr payı da yok. Payının değeri düşebilir.' },
          },
        },
        {
          id: 'kapandi',
          label: 'Kapandı',
          outcomes: {
            borc: { value: 'Belirsiz', note: 'Alacaklılar önce ödenir ama paranın hepsi dönmeyebilir.' },
            ortak: {
              value: 'Payın değersiz kalabilir',
              note: 'Ama sınırlı sorumluluk sayesinde evine, maaşına dokunulmaz.',
            },
          },
        },
      ],
      disclaimer: 'Rakamlar örnektir, gerçek bir teklif değildir.',
    },
  },
};
