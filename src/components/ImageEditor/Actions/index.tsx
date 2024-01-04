import React from "react";
import styles from "./styles.module.scss";

interface ActionsProps {
  confirmButton?: {
    label?: string;
    onClick?: (...args: any) => void;
  };
  cancelButton?: {
    label?: string;
    onClick?: (...args: any) => void;
  };
}

export default function ActionsButton(props: ActionsProps) {
  const { confirmButton, cancelButton } = props;
  return (
    <div className={styles["actions"]}>
      {/* <div className={styles["cancel"]} onClick={cancelButton?.onClick}>
        {cancelButton?.label ?? "Cancel"}
      </div> */}
      <div className={styles["confirm"]}>
        {/* <div
          className={
            confirmButton?.onClick ? styles["original"] : styles["disable"]
          }
          onClick={() => {
            confirmButton?.onClick?.(true);
          }}
        >
          Skip
        </div> */}
        <div
          className={
            confirmButton?.onClick ? styles["edited"] : styles["disable"]
          }
          onClick={() => {
            confirmButton?.onClick?.();
          }}
        >
          {confirmButton?.label ?? "Done"}
        </div>
      </div>
    </div>
  );
}
