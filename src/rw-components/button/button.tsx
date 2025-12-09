import type { CSSObject } from "@emotion/react";
import type { ComponentProps } from "react";
import { varOf } from "../helpers";

export const globalButtonStyles: CSSObject = {
  button: {
    background: varOf("color-primary"),
    color: varOf("color-button-fg"),
    outline: "none",
    border: "0",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "1rem",
    [":disabled"]: {
      cursor: "not-allowed",
      background: varOf("color-button-bg-disabled"),
    },
  },
};

export const Button = ({ children, ...rest }: ComponentProps<"button">) => {
  return <button {...rest}>{children}</button>;
};
