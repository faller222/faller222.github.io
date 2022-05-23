export function vibrate(pattern) {
  const canVibrate = window.navigator.vibrate
  if (canVibrate) window.navigator.vibrate(pattern)
}
