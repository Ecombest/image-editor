import ImageEditor from "..";

export default {
  title: "Image editor",
  component: ImageEditor,
};

export const Editor1 = {
  args: {
    cropper: {
      width: 600,
      height: 400,
      borderWidth: 2,
    },
    filters: [
      { label: "Original", filter: "" },
      { label: "B & W", filter: "grayscale(1)" },
      // // { label: "Sepia", filter: "sepia(1)" },
      { label: "Saturate", filter: "saturate(1.5)", selected: true },
      // // { label: "Invert", filter: "invert(1)" },
    ],
  },
};
