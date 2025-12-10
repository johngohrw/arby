import { buttonThemeVars, globalButtonStyles } from "./button/button";
import { inputThemeVars } from "./input/input";
import { badgeThemeVars } from "./badge/badge";
import type { CSSObject } from "@emotion/react";
import { varOf } from "./style-helpers";

export const baseColors = {
  "color-destructive": "#ff4d4f",
  "color-success": "#5cb85c",
  // warning
  // info
};

export const baseVariables = {
  ["root-font-scale"]: "14px",
  ["color-bg"]: "#f9f9f9",
  ["color-fg"]: "black",
  ["color-primary"]: "#0f8bd5",
  ["color-border"]: "#888",
  ["roundness-base"]: "0.3rem",
  ["roundness-input"]: "0.3rem",
  ...baseColors,
};

export const sensibleDefaults = {
  [":root"]: {
    fontSize: varOf("root-font-scale"),
    background: varOf("color-bg"),
    color: varOf("color-fg"),
  },
  ["*"]: {
    boxSizing: "border-box",
  },
} satisfies CSSObject;

export const allComponentThemeVariables = {
  ...buttonThemeVars,
  ...inputThemeVars,
  ...badgeThemeVars,
};

export const allComponentGlobalStyles = {
  ...globalButtonStyles,
};
