import React, { useEffect } from "react";

interface Props {
  element: HTMLDivElement | null;
  factors: {
    fx: -1 | 0 | 1;
    fy: -1 | 0 | 1;
    fw: -1 | 0 | 1;
    fh: -1 | 0 | 1;
  };
  onResize: (dx: number, dy: number, dw: number, dh: number) => void;
}

export default function (props: Props) {
  const { element, factors, onResize } = props;
  const { fx, fy, fw, fh } = factors;

  useEffect(() => {
    if (!element) return;

    let resizable = false;
    const startPosition = { x: 0, y: 0 };

    // mouse events
    const onMouseDown = (event: MouseEvent) => {
      resizable = true;
      startPosition.x = event.clientX;
      startPosition.y = event.clientY;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };
    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      if (resizable) {
        const dx = event.clientX - startPosition.x;
        const dy = event.clientY - startPosition.y;
        startPosition.x = event.clientX;
        startPosition.y = event.clientY;
        onResize(dx * fx, dy * fy, dx * fw, dy * fh);
      }
    };
    const onMouseUp = () => {
      resizable = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    // touch events
    const onTouchStart = (event: TouchEvent) => {
      resizable = true;
      const touch = event.touches[0];
      if (touch) {
        startPosition.x = touch.clientX;
        startPosition.y = touch.clientY;
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd);
      }
    };
    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (!resizable) return;
      const touches = event.touches;
      if (touches.length == 1) {
        const touch = touches[0];
        const dx = touch.clientX - startPosition.x;
        const dy = touch.clientY - startPosition.y;
        startPosition.x = touch.clientX;
        startPosition.y = touch.clientY;
        onResize(dx * fx, dy * fy, dx * fw, dy * fh);
      }
    };
    const onTouchEnd = () => {
      resizable = false;
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    element.addEventListener("mousedown", onMouseDown);
    element.addEventListener("touchstart", onTouchStart, { passive: false });

    return () => {
      element.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      element.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [element, factors, onResize]);

  return <></>;
}
