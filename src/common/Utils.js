export function vibrate(pattern) {
  const canVibrate = window.navigator.vibrate
  if (canVibrate) window.navigator.vibrate(pattern)
}

export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.top < 50
    // rect.left >= 0 &&
    // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
