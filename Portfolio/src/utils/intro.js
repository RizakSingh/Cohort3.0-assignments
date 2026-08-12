export const INTRO_SESSION_KEY = 'portfolio-intro-played'

export function introAlreadyPlayed() {
  try {
    return Boolean(sessionStorage.getItem(INTRO_SESSION_KEY))
  } catch {
    return false
  }
}

export function markIntroPlayed() {
  try {
    sessionStorage.setItem(INTRO_SESSION_KEY, '1')
  } catch {
    /* sessionStorage unavailable (private mode etc.) — non-fatal */
  }
}
