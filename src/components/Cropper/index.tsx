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
import Resizer from "./Resizer";

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
  const bottomRight = useRef<HTMLDivElement>(null);
  const bottomLeft = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);

  const resizeCropper = (dx: number, dy: number, dw: number, dh: number) => {
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

  // init mouse event
  useEffect(() => {
    const highlight = highlightRef.current;
    if (!highlight) return;

    let isMouseDown = false;
    const startPosition = { x: 0, y: 0 };

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
        resizeCropper(dx, dy, 0, 0);
      }
    };

    highlight.addEventListener("mousedown", onMouseDown);
    highlight.addEventListener("mouseup", onMouseUp);
    highlight.addEventListener("mouseout", onMouseOut);
    highlight.addEventListener("mousemove", onMouseMove);

    return () => {
      highlight.removeEventListener("mousedown", onMouseDown);
      highlight.removeEventListener("mouseup", onMouseUp);
      highlight.removeEventListener("mouseout", onMouseOut);
      highlight.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  //init touch event
  useEffect(() => {
    const highlight = highlightRef.current;
    if (!highlight) return;

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
        resizeCropper(dx, dy, 0, 0);
      }
    };

    highlight.addEventListener("touchstart", onTouchStart, {
      passive: false,
    });
    highlight.addEventListener("touchend", onTouchEnd);
    highlight.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      highlight.removeEventListener("touchstart", onTouchStart);
      highlight.removeEventListener("touchend", onTouchEnd);
      highlight.removeEventListener("touchmove", onTouchMove);
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
            alt=""
            ref={imageRef}
            src={imageFile && URL.createObjectURL(imageFile)}
          />
        </div>
      </div>
      <div className={styles["resizers"]}>
        {/* Corners */}
        <div ref={topLeft} className={styles["corner"]}>
          <Resizer
            element={topLeft.current}
            factors={{ fx: 1, fy: 1, fw: -1, fh: -1 }}
            onResize={resizeCropper}
          />
        </div>
        <div ref={topRight} className={styles["corner"]}>
          <Resizer
            element={topRight.current}
            factors={{ fx: 0, fy: 1, fw: 1, fh: -1 }}
            onResize={resizeCropper}
          />
        </div>
        <div ref={bottomRight} className={styles["corner"]}>
          <Resizer
            element={bottomRight.current}
            factors={{ fx: 0, fy: 0, fw: 1, fh: 1 }}
            onResize={resizeCropper}
          />
        </div>
        <div ref={bottomLeft} className={styles["corner"]}>
          <Resizer
            element={bottomLeft.current}
            factors={{ fx: 1, fy: 0, fw: -1, fh: 1 }}
            onResize={resizeCropper}
          />
        </div>
        {/* Edges */}
        <div ref={top} className={styles["edge"]}>
          <Resizer
            element={top.current}
            factors={{ fx: 0, fy: 1, fw: 0, fh: -1 }}
            onResize={resizeCropper}
          />
        </div>
        <div ref={right} className={styles["edge"]}>
          <Resizer
            element={right.current}
            factors={{ fx: 0, fy: 0, fw: 1, fh: 0 }}
            onResize={resizeCropper}
          />
        </div>
        <div ref={bottom} className={styles["edge"]}>
          <Resizer
            element={bottom.current}
            factors={{ fx: 0, fy: 0, fw: 0, fh: 1 }}
            onResize={resizeCropper}
          />
        </div>
        <div ref={left} className={styles["edge"]}>
          <Resizer
            element={left.current}
            factors={{ fx: 1, fy: 0, fw: -1, fh: 0 }}
            onResize={resizeCropper}
          />
        </div>
      </div>
    </div>
  );
}
