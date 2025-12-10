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
    padding: "0.35rem 0.75rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    [":disabled"]: {
      cursor: "not-allowed",
      background: varOf("color-button-bg-disabled"),
    },
  },
};

export const Button = ({ children, ...rest }: ComponentProps<"button">) => {
  return <button {...rest}>{children}</button>;
};
