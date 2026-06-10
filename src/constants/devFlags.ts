// Temporary QA switch.
// IMPORTANT: set to false before production release.
export const UNLOCK_ALL_FOR_TEST = true;

// Audio step visibility is controlled per-step via metadata.hidden_in_app in the DB.
// This global kill-switch stays available if all audio needs to be hidden again.
export const HIDE_AUDIO_STEPS_TEMPORARILY = false;

// Ses dosyası hazır dersler: hidden_in_app=true olsa bile uygulamada gösterilir.
// (DB güncellemesi yapılamadığında veya ses rollout sırasında kullanılır.)
export const LESSONS_WITH_AUDIO_READY: number[] = [27]; // Ders 1 = lesson_id 27

