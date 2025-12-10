import type { CSSObject } from "@emotion/react";
import type { ComponentProps } from "react";
import { varOf } from "../style-helpers";

// expose certain values as theme variables
export const buttonThemeVars = {
  ["color-button-fg"]: "#f9f9f9",
  ["color-button-bg-disabled"]: "#999",
} as const;

export const globalButtonStyles: CSSObject = {
  button: {
    background: varOf("color-primary"),
    color: varOf("color-button-fg"),
    outline: "none",
    border: "0",
    borderRadius: varOf("roundness-input"),
    padding: "0.4rem 0.8rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    textWrap: "nowrap",
    [":disabled"]: {
      cursor: "not-allowed",
      background: varOf("color-button-bg-disabled"),
    },
  },
};

export const Button = ({ children, ...rest }: ComponentProps<"button">) => {
  return <button {...rest}>{children}</button>;
};
