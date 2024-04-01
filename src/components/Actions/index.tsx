import React from "react";
import styles from "./styles.module.scss";

interface ActionsProps {
  confirmButton?: {
    label?: string;
    onClick?: (...args: any) => void;
  };
}

export default function ActionsButton(props: ActionsProps) {
  const { confirmButton } = props;

  return (
    <div className={styles["actions"]}>
      <div className={styles["confirm"]}>
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
