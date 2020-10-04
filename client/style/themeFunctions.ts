export type any = {
  color: {
    background: String;
    buttonText: String;
    link: String;
    secondary: String;
    text: String;
  };
  font: {
    medium: String;
    small: String;
  };
  grid: {
    fullPageFormWidth: String;
    maxWidth: String;
    width: String;
  };
  spacing: {
    border: String;
    borderRadius: String;
    default: String;
    large: String;
  };
};

export const colorBackground = (props: any) => props.color.background;
export const colorButtonText = (props: any) => props.color.buttonText;
export const colorSecondary = (props: any) => props.color.secondary;
export const colorLink = (props: any) => props.color.link;
export const colorText = (props: any) => props.color.text;
export const fontMedium = (props: any) => props.font.medium;
export const fontSmall = (props: any) => props.font.small;
export const gridFullPageFormWidth = (props: any) =>
  props.grid.fullPageFormWidth;
export const gridWidth = (props: any) => props.grid.width;
export const gridMaxWidth = (props: any) => props.grid.maxWidth;
export const spacingBorder = (props: any) => props.spacing.border;
export const spacingBorderRadius = (props: any) => props.spacing.borderRadius;
export const spacingDefault = (props: any) => props.spacing.default;
export const themeSpacingLarge = (props: any) => props.spacing.large;
