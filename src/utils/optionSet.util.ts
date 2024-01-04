export const isOptionHasValue = (option: any) => {
  const optionValues = (window as any)?.optionValues ?? {};
  return optionValues[option?.optionId] != undefined;
};

export const onOptionAvailable = (
  option: any,
  element: HTMLDivElement,
  isAvailable: boolean
) => {
  let availableOptions: any = (window as any)?.availableOptions ?? {};
  if (!option?.optionId) return;
  if (isAvailable) {
    availableOptions[option.optionId] = {
      option,
      element,
    };
  } else {
    delete availableOptions[option.optionId];
  }
  (window as any).availableOptions = availableOptions;
};
