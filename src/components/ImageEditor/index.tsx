import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { drawImage } from "@/utils/canvas.util";
import Properties from "./Properties";
import Actions from "./Actions";
import Filters from "./Filters";
import Cropper from "./Cropper";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import UploadImage from "./Options/UploadImage";
import {
  applyFilter,
  processImageFile,
  fitInCropper,
  getImageActualDimensions,
  updateCropperProperties,
} from "@/utils/image.util";
import {
  CROPPER_MIN_HEIGHT,
  CROPPER_MIN_WIDTH,
} from "@/constants/cropper.constant";
import { distanceBetweenTwoPoints } from "@/utils/event.util";

declare var MarvinImage: any;

interface ImageEditorProps {
  image?: File;
  cropper?: { width: number; height: number; [prop: string]: any };
  container?: {
    width: number | string;
    height: number | string;
  };
  filters?: { label: string; filter: string; selected?: boolean }[];
  confirmButton?: {
    label?: string;
    onClick?: (images: {
      original?: File;
      edited?: Blob;
      cropper?: any;
    }) => void;
  };
  cancelButton?: {
    label?: string;
    onClick?: () => void;
  };
}

export default function ImageEditor(props: ImageEditorProps) {
  const {
    image,
    cropper = { width: 400, height: 400 },
    filters = [],
    container = { width: "100%", height: "50vh" },
    confirmButton,
    cancelButton,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const uploaderRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File>();
  const [cropperProperties, setCropper] = useState({
    x: -100,
    y: -100,
    width: 0,
    height: 0,
    ratio: 0,
    angle: 0,
    highlightId: `highlight-${Math.random()}`,
  });
  const [imageProperties, setImage] = useState({
    x: 0,
    y: 0,
    scale: 1,
    filter: "",
    scaleX: 1,
    scaleY: 1,
    whRatio: 1,
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://ecb-personalize-storage.sgp1.digitaloceanspaces.com/ecb-static/libs/bestbuildyou/marvinj-1.0.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // init image
  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const onResize = () => {
      const whRatio = container.clientWidth / container.clientHeight;
      if (whRatio < image.naturalWidth / image.naturalHeight) {
        imageProperties.scale = container.clientWidth / image.naturalWidth;
      } else {
        imageProperties.scale = container.clientHeight / image.naturalHeight;
      }
      window.dispatchEvent(
        new CustomEvent("resize-cropper", {
          detail: {
            width: container.clientWidth,
            height: container.clientHeight,
          },
        })
      );
    };

    image.src = imageFile ? URL.createObjectURL(imageFile) : "";
    if (imageFile) {
      image.onload = () => {
        imageProperties.whRatio = image.naturalWidth / image.naturalHeight;
        fitInCropper(image, cropper, cropperProperties);
        onResize();
      };
    } else {
      cropperProperties.width = 0;
      cropperProperties.height = 0;
      cropperProperties.x = -100;
      cropperProperties.y = -100;
      window.dispatchEvent(
        new CustomEvent("resize-cropper", {
          detail: {
            width: 0,
            height: 0,
          },
        })
      );
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [imageFile]);

  //init touch event
  useEffect(() => {
    const container = containerRef.current;
    if (!imageFile || !container) return;

    let startDistance = 0;

    const onTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      const touches = event?.touches;
      if (touches?.length == 2) {
        startDistance = distanceBetweenTwoPoints(touches[0], touches[1]);
      }
    };

    const onResizeCropper = (event: TouchEvent) => {
      event.preventDefault();
      const touches = event?.touches;
      if (touches?.length == 2) {
        const distance = distanceBetweenTwoPoints(touches[0], touches[1]);
        const dDistance = distance - startDistance;

        const rect = container.getBoundingClientRect();
        const x =
          (touches[0].clientX + touches[1].clientX) / 2 -
          cropperProperties.width / 2 -
          rect.left;
        const y =
          (touches[0].clientY + touches[1].clientY) / 2 -
          cropperProperties.height / 2 -
          rect.top;
        const dw = dDistance;
        const dh = dDistance / cropperProperties.ratio;
        const dx = x - cropperProperties.x;
        const dy = y - cropperProperties.y;

        const { clientWidth, clientHeight } = container;
        const { actualWidth, actualHeight } = getImageActualDimensions(
          imageRef.current
        );
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
        window.dispatchEvent(new CustomEvent("update-cropper"));
        startDistance = distance;
      }
    };

    if (container) {
      container.addEventListener("touchstart", onTouchStart, {
        passive: false,
      });
      container.addEventListener("touchmove", onResizeCropper, {
        passive: false,
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", onTouchStart);
        container.removeEventListener("touchmove", onResizeCropper);
      }
    };
  }, [imageFile]);

  // init image
  useEffect(() => {
    onChangeImage(image);
  }, [image]);

  const onChangeImage = (imageFile?: File) => {
    processImageFile(imageFile).then((processedImageFile) => {
      setImageFile(processedImageFile as File);
    });
  };

  const applyImageEdit = (isOriginal?: boolean) => {
    // skip
    if (isOriginal) {
      imageFile?.arrayBuffer().then((arrayBuffer) => {
        confirmButton?.onClick?.({
          original: imageFile,
          edited: new Blob([arrayBuffer], { type: "image/png" }),
          cropper: cropperProperties,
        });
      });
      return;
    }

    // apply edit
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;
    const canvas = document.createElement("canvas");
    const whRatio = container.clientWidth / container.clientHeight;
    if (whRatio < image.naturalWidth / image.naturalHeight) {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalWidth / whRatio;
      imageProperties.scale = container.clientWidth / image.naturalWidth;
    } else {
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalHeight * whRatio;
      imageProperties.scale = container.clientHeight / image.naturalHeight;
    }
    drawImage(canvas, image, {
      x: (canvas.width - image.naturalWidth) / 2,
      y: (canvas.height - image.naturalHeight) / 2,
      filter: "",
      scaleX: imageProperties.scaleX,
      scaleY: imageProperties.scaleY,
    });
    const { x, y, width, height } = cropperProperties;
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = width / imageProperties.scale;
    croppedCanvas.height = height / imageProperties.scale;
    const ctx = croppedCanvas.getContext("2d");
    ctx?.drawImage(
      canvas,
      x / imageProperties.scale,
      y / imageProperties.scale,
      croppedCanvas.width,
      croppedCanvas.height,
      0,
      0,
      croppedCanvas.width,
      croppedCanvas.height
    );

    const croppedImage = new MarvinImage();
    croppedImage.load(croppedCanvas.toDataURL(), () => {
      const filteredImage = applyFilter(croppedImage, imageProperties.filter);
      filteredImage.update();
      filteredImage.canvas.toBlob((blob: any) => {
        if (blob) {
          confirmButton?.onClick?.({
            original: imageFile,
            edited: blob,
            cropper: cropperProperties,
          });
          canvas.remove();
          croppedCanvas.remove();
        }
      });
    });
  };

  return (
    <div className={styles["editor"]}>
      <div
        ref={containerRef}
        className={styles["container"]}
        style={{ ...container }}
      >
        <img
          ref={imageRef}
          id="image-editor"
          className={styles["image"]}
          style={{
            display: imageFile ? "" : "none",
            filter: imageProperties.filter,
            transform: `scale(${imageProperties.scaleX}, ${imageProperties.scaleY})`,
          }}
        />
        <div
          className={styles["no-image"]}
          style={{ display: imageFile ? "none" : "" }}
          onClick={() => {
            uploaderRef?.current?.click();
          }}
        >
          <DocumentArrowUpIcon width={50} height={50} />
          Upload image
          <input
            ref={uploaderRef}
            accept="image/*"
            type="file"
            hidden
            onChange={(event) => {
              onChangeImage(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
        </div>
        <Cropper
          imageFile={imageFile}
          cropperProperties={cropperProperties}
          imageProperties={imageProperties}
        />
      </div>
      <div className={styles["settings"]}>
        {filters?.length > 0 && (
          <div
            className={styles["filters"]}
            style={{ display: imageFile ? "" : "none" }}
          >
            <Filters
              imageFile={imageFile}
              image={imageRef.current}
              filters={filters}
              imageProperties={imageProperties}
              cropperProperties={cropperProperties}
            />
          </div>
        )}
        <div
          className={styles["properties"]}
          style={{ display: imageFile ? "" : "none" }}
        >
          <Properties
            image={imageRef.current}
            cropperProperties={cropperProperties}
            imageProperties={imageProperties}
          />
        </div>
        <div
          className={styles["help-text"]}
          style={{ display: imageFile ? "none" : "" }}
        >
          No image uploaded
        </div>
      </div>
      <div className={styles["actions"]}>
        <UploadImage imageFile={imageFile} onUpload={onChangeImage} />
        <div className={styles["next-step"]}>
          <Actions
            confirmButton={{
              label: confirmButton?.label,
              onClick: imageFile ? applyImageEdit : undefined,
            }}
            cancelButton={cancelButton}
          />
        </div>
      </div>
    </div>
  );
}
