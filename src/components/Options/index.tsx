import styles from "./styles.module.scss";
import UploadImage from "./UploadImage";
import basicStyles from "../../index.module.scss";
import { LoadingIcon } from "@/constants/icon.constant";

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
              currentOption === "properties"
                ? basicStyles.primaryColor
                : "gray",
          }}
        >
          <div
            className={styles["button"]}
            onClick={() => {
              onClick?.("properties");
            }}
          >
            <img alt="" src={LoadingIcon} className={styles["icon"]} />
            <div className={styles["label"]}>Properties</div>
          </div>
        </div>
        <div
          className={styles["filters"]}
          style={{
            color:
              currentOption === "filters" ? basicStyles.primaryColor : "gray",
          }}
        >
          <div
            className={styles["button"]}
            onClick={() => {
              onClick?.("filters");
            }}
          >
            <img alt="" src={LoadingIcon} className={styles["icon"]} />
            <div className={styles["label"]}>Filters</div>
          </div>
        </div>
        <div
          className={styles["croppers"]}
          style={{
            color:
              currentOption === "croppers" ? basicStyles.primaryColor : "gray",
          }}
        >
          <div
            className={styles["button"]}
            onClick={() => {
              onClick?.("croppers");
            }}
          >
            <img alt="" src={LoadingIcon} className={styles["icon"]} />
            <div className={styles["label"]}>Croppers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
