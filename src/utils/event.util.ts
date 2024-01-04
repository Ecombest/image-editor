export const distanceBetweenTwoPoints = (
  p1: Touch | MouseEvent,
  p2: Touch | MouseEvent
) => {
  return Math.sqrt(
    (p1.clientX - p2.clientX) ** 2 + (p1.clientY - p2.clientY) ** 2
  );
};
