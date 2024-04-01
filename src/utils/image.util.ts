import { IMAGE_FILTERS } from "@/constants/image.contant";
import heic2any from "heic2any";

declare var Marvin: any;

export const drawCropper = (
  cropper: HTMLDivElement | undefined | null,
  options: {
    x: number;
    y: number;
    width: number;
    height: number;
    angle: number;
    highlightId: string;
  }
) => {
  if (!cropper) return;
  const { x, y, width, height, angle, highlightId } = options;
  cropper.style.width = `${width}px`;
  cropper.style.height = `${height}px`;
  cropper.style.left = `${x}px`;
  cropper.style.top = `${y}px`;

  const highlight = document.getElementById(highlightId);
  if (highlight) {
    highlight.style.left = `${-x}px`;
    highlight.style.top = `${-y}px`;
  }
};

export const updateCropperProperties = (
  cropperProperties: any,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  minX: number = 0,
  minY: number = 0,
  minWidth: number = 0,
  minHeight: number = 0,
  maxWidth: number = 0,
  maxHeight: number = 0
) => {
  const nextW = cropperProperties.width + dw;
  const nextH = cropperProperties.height + dh;
  if (
    nextW < minWidth ||
    nextW > maxWidth ||
    nextH < minHeight ||
    nextH > maxHeight
  )
    return;
  const nextX = cropperProperties.x + dx;
  const nextY = cropperProperties.y + dy;
  if (nextX >= minX) {
    if (nextX + nextW <= maxWidth + minX) {
      cropperProperties.x = nextX;
    } else {
      cropperProperties.x = maxWidth - nextW + minX;
    }
  } else {
    cropperProperties.x = minX;
  }

  if (nextY >= minY) {
    if (nextY + nextH <= maxHeight + minY) {
      cropperProperties.y = nextY;
    } else {
      cropperProperties.y = maxHeight - nextH + minY;
    }
  } else {
    cropperProperties.y = minY;
  }

  cropperProperties.width = nextW;
  cropperProperties.height = nextH;
  cropperProperties.ratio = cropperProperties.width / cropperProperties.height;
};

export const getImageActualDimensions = (image?: HTMLImageElement | null) => {
  if (!image) return { actualWidth: 0, actualHeight: 0 };
  const { clientWidth, clientHeight, naturalWidth, naturalHeight } = image;
  const clientRatio = clientWidth / clientHeight;
  const naturalRatio = naturalWidth / naturalHeight;
  if (clientRatio > naturalRatio) {
    return {
      actualWidth: clientHeight * naturalRatio,
      actualHeight: clientHeight,
    };
  } else {
    return {
      actualWidth: clientWidth,
      actualHeight: clientWidth / naturalRatio,
    };
  }
};

export const fitInCropper = (
  image: HTMLImageElement | undefined | null,
  cropper: any,
  cropperProperties: any
) => {
  if (!image || !cropper) return;

  const { actualHeight, actualWidth } = getImageActualDimensions(image);
  const imageRatio = actualWidth / actualHeight;
  const cropperRatio = (cropper?.width ?? 1) / (cropper?.height ?? 1);
  if (imageRatio > cropperRatio) {
    cropperProperties.width = actualHeight * cropperRatio;
    cropperProperties.height = actualHeight;
  } else {
    cropperProperties.width = actualWidth;
    cropperProperties.height = actualWidth / cropperRatio;
  }
  const { width, height } = cropperProperties;
  cropperProperties.x = (image.clientWidth - width) / 2;
  cropperProperties.y = (image.clientHeight - height) / 2;
  cropperProperties.ratio = cropperRatio;
};

export const applyFilter = (image: any, filter: string) => {
  const filters = filter.split(" ");
  for (filter of filters) {
    switch (filter.split("(")?.[0]) {
      case IMAGE_FILTERS.grayscale:
        Marvin.grayScale(image, image);
        continue;
      default:
        continue;
    }
  }

  return image;
};

export const processImageFile = async (
  imageFile?: File
): Promise<Blob | Blob[] | undefined> => {
  if (imageFile?.type === "image/heic") {
    return new Promise((resolve, reject) => {
      heic2any({
        blob: imageFile,
        toType: "image/png",
      })
        .then((blob: Blob | Blob[]) => {
          resolve(blob);
        })
        .catch((error: any) => {
          reject(undefined);
        });
    });
  } else {
    return imageFile;
  }
};
