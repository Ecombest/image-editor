import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { imageProperties } from "@/states/image.state";
import baseStyles from "../global.module.scss";

interface FiltersProps {
  imageFile?: File | Blob;
  image?: HTMLImageElement | null;
  filters?: { label: string; filter: string; selected?: boolean }[];
}

export default function Filters(props: FiltersProps) {
  const { image, imageFile, filters } = props;
  const [imageSrc, setImageSrc] = useState<string>();
  const [currentFilter, setCurrentFilter] = useState("");

  useEffect(() => {
    if (imageFile) {
      setImageSrc(URL.createObjectURL(imageFile));
    }
  }, [imageFile]);

  useEffect(() => {
    const selectedFilter =
      filters?.find((filter) => filter.selected) ?? filters?.[0];
    imageProperties.filter = selectedFilter?.filter ?? "";
    setCurrentFilter(imageProperties.filter);
  }, [filters]);

  const onFilter = (filter: string) => {
    imageProperties.filter = filter;
    setCurrentFilter(filter);
    if (!image) return;
    image.style.filter = filter;
    const highlight = document.getElementById("highlight");
    if (!highlight) return;
    highlight.style.filter = filter;
  };

  return (
    <div className={styles["filters"]}>
      {filters?.map((filter) => {
        return (
          <div
            className={styles["filter"]}
            key={filter.filter}
            onClick={() => {
              onFilter?.(filter.filter);
            }}
          >
            <div
              className={styles["image"]}
              style={{
                boxShadow:
                  currentFilter == filter.filter
                    ? `0 0 0 2px ${baseStyles.primaryColor}`
                    : "none",
              }}
            >
              <img src={imageSrc} style={{ filter: filter.filter }} />
            </div>

            <div className={styles["label"]}>{filter.label}</div>
          </div>
        );
      })}
    </div>
  );
}
