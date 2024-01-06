import React, { useRef } from "react";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import styles from "./styles.module.scss";

interface UploadImageProps {
  imageFile?: File | Blob;
  onUpload?: (imageFile: File) => void;
}

export default function UploadImage(props: UploadImageProps) {
  const { imageFile, onUpload } = props;

  const labelRef = useRef<HTMLDivElement>(null);
  const uploaderRef = useRef<HTMLInputElement>(null);

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
        {imageFile ? "Re-upload" : "Upload"}
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
