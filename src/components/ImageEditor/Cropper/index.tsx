import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import {
  drawCropper,
  getImageActualDimensions,
  updateCropperProperties,
} from "@/utils/image.util";
import {
  CROPPER_MIN_HEIGHT,
  CROPPER_MIN_WIDTH,
} from "@/constants/cropper.constant";

interface CropperProps {
  imageFile?: File | Blob;
  cropperProperties: any;
  imageProperties: any;
}

export default function Cropper(props: CropperProps) {
  const { imageFile, cropperProperties, imageProperties } = props;
  const cropperRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLImageElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const topLeft = useRef<HTMLDivElement>(null);
  const topRight = useRef<HTMLDivElement>(null);
  const bottomLeft = useRef<HTMLDivElement>(null);
  const bottomRight = useRef<HTMLDivElement>(null);

  const updateCropper = (dx: number, dy: number, dw: number, dh: number) => {
    const image = imageRef.current;
    const { clientWidth = 0, clientHeight = 0 } = image ?? {};
    const { actualWidth, actualHeight } = getImageActualDimensions(image);
    updateCropperProperties(
      cropperProperties,
      dx,
      dy,
      dw,
      dh,
      (clientWidth - actualWidth) / 2,
      (clientHeight - actualHeight) / 2,
      CROPPER_MIN_WIDTH,
      CROPPER_MIN_HEIGHT,
      actualWidth,
      actualHeight
    );
    drawCropper(cropperRef.current, cropperProperties);
  };

  // init draw cropper events
  useEffect(() => {
    const cropper = cropperRef.current;
    const highlight = highlightRef.current;
    if (!highlight || !cropper) return;

    const onUpdateCropper = () => {
      drawCropper(cropper, cropperProperties);
    };

    const onResizeCropper = (payload: any) => {
      const { width, height } = payload.detail ?? {};
      if (width && height) {
        highlight.style.width = `${width}px`;
        highlight.style.height = `${height}px`;
      }
      drawCropper(cropper, cropperProperties);
    };

    window.addEventListener("update-cropper", onUpdateCropper);
    window.addEventListener("resize-cropper", onResizeCropper);
    return () => {
      window.removeEventListener("update-cropper", onUpdateCropper);
      window.removeEventListener("resize-cropper", onResizeCropper);
    };
  }, []);

  // init top left corner events
  useEffect(() => {
    const tl = topLeft.current;
    if (!tl) return;
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
        updateCropper(dx, dy, -dx, -dy);
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
        updateCropper(dx, dy, -dx, -dy);
      }
    };
    const onTouchEnd = () => {
      resizable = false;
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    tl.addEventListener("mousedown", onMouseDown);
    tl.addEventListener("touchstart", onTouchStart, { passive: false });

    return () => {
      tl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      tl.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // init top right corner events
  useEffect(() => {
    const tr = topRight.current;
    if (!tr) return;
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
        const dy = -event.clientY + startPosition.y;
        startPosition.x = event.clientX;
        startPosition.y = event.clientY;
        updateCropper(0, -dy, dx, dy);
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
        const dy = -touch.clientY + startPosition.y;
        startPosition.x = touch.clientX;
        startPosition.y = touch.clientY;
        updateCropper(0, -dy, dx, dy);
      }
    };
    const onTouchEnd = () => {
      resizable = false;
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    tr.addEventListener("mousedown", onMouseDown);
    tr.addEventListener("touchstart", onTouchStart, { passive: false });

    return () => {
      tr.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      tr.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // init bottom left corner events
  useEffect(() => {
    const bl = bottomLeft.current;
    if (!bl) return;
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
        const dy = -event.clientY + startPosition.y;
        startPosition.x = event.clientX;
        startPosition.y = event.clientY;
        updateCropper(dx, 0, -dx, -dy);
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
        const dy = -touch.clientY + startPosition.y;
        startPosition.x = touch.clientX;
        startPosition.y = touch.clientY;
        updateCropper(dx, 0, -dx, -dy);
      }
    };
    const onTouchEnd = () => {
      resizable = false;
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    bl.addEventListener("mousedown", onMouseDown);
    bl.addEventListener("touchstart", onTouchStart, { passive: false });

    return () => {
      bl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      bl.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // init bottom right corner events
  useEffect(() => {
    const br = bottomRight.current;
    if (!br) return;
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
        updateCropper(0, 0, dx, dy);
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
        updateCropper(0, 0, dx, dy);
      }
    };
    const onTouchEnd = () => {
      resizable = false;
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    br.addEventListener("mousedown", onMouseDown);
    br.addEventListener("touchstart", onTouchStart, { passive: false });

    return () => {
      br.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      br.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // init mouse event
  useEffect(() => {
    const startPosition: any = {};
    let isMouseDown = false;

    const onMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      startPosition.x = event.clientX;
      startPosition.y = event.clientY;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseOut = () => {
      isMouseDown = false;
    };

    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      if (isMouseDown) {
        const dx = event.clientX - startPosition.x;
        const dy = event.clientY - startPosition.y;
        startPosition.x = event.clientX;
        startPosition.y = event.clientY;
        updateCropper(dx, dy, 0, 0);
      }
    };

    const highlight = highlightRef.current;
    if (highlight) {
      highlight.addEventListener("mousedown", onMouseDown);
      highlight.addEventListener("mouseup", onMouseUp);
      highlight.addEventListener("mouseout", onMouseOut);
      highlight.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      if (highlight) {
        highlight.removeEventListener("mousedown", onMouseDown);
        highlight.removeEventListener("mouseup", onMouseUp);
        highlight.removeEventListener("mouseout", onMouseOut);
        highlight.removeEventListener("mousemove", onMouseMove);
      }
    };
  }, []);

  //init touch event
  useEffect(() => {
    const startPosition: any = {};
    let isTouching = false;

    const onTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      isTouching = true;
      if (event?.touches?.length == 1) {
        const touch = event?.targetTouches?.[0];
        if (touch) {
          isTouching = true;
          startPosition.x = touch.clientX;
          startPosition.y = touch.clientY;
        }
      }
    };

    const onTouchEnd = () => {
      isTouching = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (!isTouching) return;
      const touches = event?.touches;
      if (touches.length == 1) {
        const touch = touches[0];
        const dx = touch.clientX - startPosition.x;
        const dy = touch.clientY - startPosition.y;
        startPosition.x = touch.clientX;
        startPosition.y = touch.clientY;
        updateCropper(dx, dy, 0, 0);
      }
    };

    const highlight = highlightRef.current;
    if (highlight) {
      highlight.addEventListener("touchstart", onTouchStart, {
        passive: false,
      });
      highlight.addEventListener("touchend", onTouchEnd);
      highlight.addEventListener("touchmove", onTouchMove, { passive: false });
    }

    return () => {
      if (highlight) {
        highlight.removeEventListener("touchstart", onTouchStart);
        highlight.removeEventListener("touchend", onTouchEnd);
        highlight.removeEventListener("touchmove", onTouchMove);
      }
    };
  }, []);

  return (
    <div ref={cropperRef} className={styles["cropper"]}>
      <div className={styles["highlight-container"]}>
        <div
          ref={highlightRef}
          id={cropperProperties.highlightId}
          className={styles["highlight"]}
          style={{
            filter: imageProperties.filter,
            transform: `scale(${imageProperties.scaleX}, ${imageProperties.scaleY})`,
          }}
        >
          <img
            ref={imageRef}
            src={imageFile && URL.createObjectURL(imageFile)}
          />
        </div>
      </div>
      <div className={styles["corners"]}>
        <div ref={topLeft} className={styles["corner"]}></div>
        <div ref={topRight} className={styles["corner"]}></div>
        <div ref={bottomLeft} className={styles["corner"]}></div>
        <div ref={bottomRight} className={styles["corner"]}></div>
      </div>
    </div>
  );
}
