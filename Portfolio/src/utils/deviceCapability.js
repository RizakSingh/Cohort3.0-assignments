/**
 * A rough, conservative signal for weak hardware — low core count reliably
 * correlates with budget/older devices that struggle with a continuous
 * WebGL render loop. False negatives (a strong device reporting low count)
 * just mean it gets a lighter CSS fallback, never a broken page.
 */
export function isLowPowerDevice() {
  if (typeof navigator === 'undefined') return false
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true
  if (navigator.deviceMemory && navigator.deviceMemory <= 4) return true
  return false
}
