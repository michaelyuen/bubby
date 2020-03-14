import { DefaultTheme } from "styled-components";

interface Props {
  theme: DefaultTheme;
}

export const colorBackground = (props: Props) => props.theme.color.background;
export const colorBackgroundDarkMode = (props: Props) =>
  props.theme.color.colorBackgroundDarkMode;
export const colorButtonText = (props: Props) => props.theme.color.buttonText;
export const colorSecondary = (props: Props) => props.theme.color.secondary;
export const colorLink = (props: Props) => props.theme.color.link;
export const colorText = (props: Props) => props.theme.color.text;
export const fontMedium = (props: Props) => props.theme.font.medium;
export const fontSmall = (props: Props) => props.theme.font.small;
export const gridFullPageFormWidth = (props: Props) =>
  props.theme.grid.fullPageFormWidth;
export const gridMaxWidth = (props: Props) => props.theme.grid.maxWidth;
export const spacingBorder = (props: Props) => props.theme.spacing.border;
export const spacingBorderRadius = (props: Props) =>
  props.theme.spacing.borderRadius;
export const spacingDefault = (props: Props) => props.theme.spacing.default;
export const themeSpacingLarge = (props: Props) => props.theme.spacing.large;
