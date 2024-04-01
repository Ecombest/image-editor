import ImageEditor from "../src/App";

export default {
  title: "Image editor",
  component: ImageEditor,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export const Primary = {
  args: {
    filters: [
      { label: "Original", filter: "" },
      { label: "B & W", filter: "grayscale(1)" },
      { label: "Sepia", filter: "sepia(1)" },
      { label: "Saturate", filter: "saturate(1.5)", selected: true },
      { label: "Invert", filter: "invert(1)" },
    ],
  },
};
