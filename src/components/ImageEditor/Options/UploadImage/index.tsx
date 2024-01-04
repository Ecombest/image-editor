import React, { useEffect, useRef } from "react";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import styles from "./styles.module.scss";

interface UploadImageProps {
  onUpload?: (imageFile: File) => void;
}

export default function UploadImage(props: UploadImageProps) {
  const { onUpload } = props;

  const labelRef = useRef<HTMLDivElement>(null);
  const uploaderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onImageUploaded = (payload: any) => {
      const { imageFile } = payload.detail ?? {};
      if (labelRef.current) {
        labelRef.current.innerHTML = imageFile ? "Re-upload" : "Upload";
      }
    };
    window.addEventListener("image-uploaded", onImageUploaded);
    return () => {
      window.removeEventListener("image-uploaded", onImageUploaded);
    };
  }, []);

  const onOpenUploader = () => {
    uploaderRef?.current?.click();
  };

  const onFileUploaded = (file: File | undefined) => {
    if (file) {
      onUpload?.(file);
    }
  };

  return (
    <div className={styles["uploader"]} onClick={onOpenUploader}>
      <DocumentArrowUpIcon className={styles["icon"]} />
      <div ref={labelRef} className={styles["label"]}>
        Upload
      </div>
      <input
        ref={uploaderRef}
        accept="image/*"
        type="file"
        hidden
        onChange={(event) => {
          onFileUploaded(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </div>
  );
}
