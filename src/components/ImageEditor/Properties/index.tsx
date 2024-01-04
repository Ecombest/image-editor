import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/solid";
import {
  CROPPER_MIN_HEIGHT,
  CROPPER_MIN_WIDTH,
  dZoom,
} from "@/constants/cropper.constant";
import {
  getImageActualDimensions,
  updateCropperProperties,
} from "@/utils/image.util";
import { FlipIcon } from "@/constants/icon.constant";
import { cropperProperties, imageProperties } from "..";

interface PropertiesProps {
  image?: HTMLImageElement | undefined | null;
}

let zoomInterval: any = null;

export default function Properties(props: PropertiesProps) {
  const { image } = props;
  const zoomInRef = useRef<HTMLDivElement>(null);
  const zoomOutRef = useRef<HTMLDivElement>(null);

  const onZoom = (dZoom: number) => {
    const dw = dZoom;
    const dh = dZoom / cropperProperties.ratio;
    const { clientWidth = 0, clientHeight = 0 } = image ?? {};
    const { actualWidth, actualHeight } = getImageActualDimensions(image);
    updateCropperProperties(
      cropperProperties,
      -dZoom / 2,
      -dZoom / cropperProperties.ratio / 2,
      dw,
      dh,
      (clientWidth - actualWidth) / 2,
      (clientHeight - actualHeight) / 2,
      CROPPER_MIN_WIDTH,
      CROPPER_MIN_HEIGHT,
      actualWidth,
      actualHeight
    );
    window.dispatchEvent(new CustomEvent("update-cropper"));
  };

  const onFlipX = () => {
    if (!image) return;
    imageProperties.scaleX = -imageProperties.scaleX;
    image.style.transform = `scale(${imageProperties.scaleX}, ${imageProperties.scaleY})`;
    const highlight = document.getElementById("highlight");
    if (highlight) {
      highlight.style.transform = `scale(${imageProperties.scaleX}, ${imageProperties.scaleY})`;
    }
  };

  const onFlipY = () => {
    if (!image) return;
    imageProperties.scaleY = -imageProperties.scaleY;
    image.style.transform = `scale(${imageProperties.scaleX}, ${imageProperties.scaleY})`;
    const highlight = document.getElementById("highlight");
    if (highlight) {
      highlight.style.transform = `scale(${imageProperties.scaleX}, ${imageProperties.scaleY})`;
    }
  };

  // zoom events
  useEffect(() => {
    const onZoomIn = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      clearInterval(zoomInterval);
      zoomInterval = setInterval(() => {
        onZoom?.(dZoom);
      }, 10);
    };

    const onZoomOut = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      clearInterval(zoomInterval);
      zoomInterval = setInterval(() => {
        onZoom?.(-dZoom);
      }, 10);
    };

    const onZoomEnd = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      clearInterval(zoomInterval);
    };

    const zoomOutButton = zoomOutRef.current;
    if (zoomOutButton) {
      zoomOutButton.addEventListener("mousedown", onZoomOut);
      zoomOutButton.addEventListener("mouseup", onZoomEnd);
      zoomOutButton.addEventListener("mouseleave", onZoomEnd);
      zoomOutButton.addEventListener("touchstart", onZoomOut, {
        passive: false,
      });
      zoomOutButton.addEventListener("touchend", onZoomEnd);
    }

    const zoomInButton = zoomInRef.current;
    if (zoomInButton) {
      zoomInButton.addEventListener("mousedown", onZoomIn);
      zoomInButton.addEventListener("mouseup", onZoomEnd);
      zoomInButton.addEventListener("mouseleave", onZoomEnd);
      zoomInButton.addEventListener("touchstart", onZoomIn, { passive: false });
      zoomInButton.addEventListener("touchend", onZoomEnd);
    }

    return () => {
      if (zoomOutButton) {
        zoomOutButton.removeEventListener("mousedown", onZoomOut);
        zoomOutButton.removeEventListener("mouseup", onZoomEnd);
        zoomOutButton.removeEventListener("mouseleave", onZoomEnd);
        zoomOutButton.removeEventListener("touchstart", onZoomOut);
        zoomOutButton.removeEventListener("touchend", onZoomEnd);
      }

      if (zoomInButton) {
        zoomInButton.removeEventListener("mousedown", onZoomIn);
        zoomInButton.removeEventListener("mouseup", onZoomEnd);
        zoomInButton.removeEventListener("mouseleave", onZoomEnd);
        zoomInButton.removeEventListener("touchstart", onZoomIn);
        zoomInButton.removeEventListener("touchend", onZoomEnd);
      }
    };
  }, [image]);

  return (
    <div className={styles["properties"]}>
      <div className={styles["button"]} ref={zoomInRef}>
        <MagnifyingGlassPlusIcon className={styles["icon"]} />
      </div>
      <div className={styles["button"]} ref={zoomOutRef}>
        <MagnifyingGlassMinusIcon className={styles["icon"]} />
      </div>
      <div className={styles["button"]} onClick={onFlipX}>
        <img src={FlipIcon} className={styles["icon"]} />
      </div>
      <div className={styles["button"]} onClick={onFlipY}>
        <img
          src={FlipIcon}
          className={`${styles["icon"]} ${styles["flipY"]}`}
        />
      </div>
    </div>
  );
}
