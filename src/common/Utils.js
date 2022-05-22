export function vibrate(pattern) {
  const wrap = window.navigator.vibrate
  if (wrap) wrap(pattern)
}
