// Temporary QA switch.
// IMPORTANT: set to false before production release.
export const UNLOCK_ALL_FOR_TEST = false;

// Audio step visibility is controlled per-step via metadata.hidden_in_app in the DB.
// This global kill-switch stays available if all audio needs to be hidden again.
export const HIDE_AUDIO_STEPS_TEMPORARILY = false;

// Ses dosyası hazır dersler: hidden_in_app=true olsa bile uygulamada gösterilir.
// Asıl kontrol DB metadata.hidden_in_app; bu liste yalnızca yedek.
export const LESSONS_WITH_AUDIO_READY: number[] = [
  27, 28, 29, 30, 31, 53, 54, 55, 56, 57, // S1 Çaylak
];


// Yalnızca geliştirme sürümü: DB'de görev (mission) adımı olmayan derslere
// src/content/missionPreview.ts'teki önizleme görevini 14. adım olarak ekler.
// Prod/TestFlight build'lerinde (__DEV__ = false) hiçbir etkisi yoktur.
export const MISSION_PREVIEW_IN_DEV = true;
