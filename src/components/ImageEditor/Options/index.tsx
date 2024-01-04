import React from "react";
import styles from "./styles.module.scss";
import UploadImage from "./UploadImage";
import {
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import baseStyles from "../global.module.scss";

interface OptionsProps {
  onUpload?: (imageFile: File) => void;
  onClick?: (option: string) => void;
  currentOption?: string;
}

export default function Options(props: OptionsProps) {
  const { onUpload, onClick, currentOption } = props;

  return (
    <div className={styles["options"]}>
      <div className={styles["upload"]}>
        <UploadImage onUpload={onUpload} />
      </div>
      <div className={styles["settings"]}>
        <div
          className={styles["properties"]}
          style={{
            color:
              currentOption == "properties" ? baseStyles.primaryColor : "gray",
          }}
        >
          <div
            className={styles["button"]}
            onClick={() => {
              onClick?.("properties");
            }}
          >
            <AdjustmentsHorizontalIcon className={styles["icon"]} />
            <div className={styles["label"]}>Properties</div>
          </div>
        </div>
        <div
          className={styles["filters"]}
          style={{
            color:
              currentOption == "filters" ? baseStyles.primaryColor : "gray",
          }}
        >
          <div
            className={styles["button"]}
            onClick={() => {
              onClick?.("filters");
            }}
          >
            <SparklesIcon className={styles["icon"]} />
            <div className={styles["label"]}>Filters</div>
          </div>
        </div>
        <div
          className={styles["croppers"]}
          style={{
            color:
              currentOption == "croppers" ? baseStyles.primaryColor : "gray",
          }}
        >
          <div
            className={styles["button"]}
            onClick={() => {
              onClick?.("croppers");
            }}
          >
            <RectangleGroupIcon className={styles["icon"]} />
            <div className={styles["label"]}>Croppers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
