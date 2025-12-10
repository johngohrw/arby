import type { CSSObject } from "@emotion/react";
import * as React from "react";
import { baseVarOf, cssOf, varOf } from "../style-helpers";

// expose certain values as theme variables
export const inputThemeVars = {
  "color-input-active": baseVarOf("color-primary"),
  "color-input-fg": "black",
  "color-input-fg-muted": "#888",
  "color-input-bg": "white",
  "color-input-bg-muted": "#eee",
  "color-input-border": "#bbb",
  "border-input-width": "1px",
  "box-shadow-input": "0px 0px 8px -3px rgba(0, 0, 0, 0.2)",
} as const;

export const inputStyles: CSSObject = {
  color: varOf("color-input-fg"),
  backgroundColor: varOf("color-input-bg"),
  borderColor: varOf("color-input-border"),
  borderWidth: varOf("border-input-width"),
  borderStyle: "solid",
  width: "100%",
  minWidth: 0,
  borderRadius: varOf("roundness-input"),
  padding: "0.4rem 0.6rem",
  fontSize: "1rem",
  boxShadow: varOf("box-shadow-input"),
  transition: "color 150ms, box-shadow 150ms",
  outline: "none",

  "::placeholder": {
    color: varOf("color-input-fg-muted"),
  },

  //   "::selection": {
  //     backgroundColor: "var(--primary)",
  //     color: "var(--primary-foreground)",
  //   },

  //   // file input button:
  //   "::-webkit-file-upload-button": {
  //     display: "inline-flex",
  //     height: "1.75rem", // h-7
  //     border: 0,
  //     background: "transparent",
  //     fontSize: "0.875rem", // text-sm
  //     fontWeight: 500,
  //   },

  //   // firefox equivalent:
  //   "::file-selector-button": {
  //     display: "inline-flex",
  //     height: "1.75rem",
  //     border: 0,
  //     background: "transparent",
  //     fontSize: "0.875rem",
  //     fontWeight: 500,
  //   },

  // disabled:
  "&:disabled": {
    // pointerEvents: "none",
    cursor: "not-allowed",
    backgroundColor: varOf("color-input-bg-muted"),
    color: varOf("color-input-fg-muted"),
  },

  // focus-visible:
  "&:focus-visible": {
    borderColor: varOf("color-input-active"),
    boxShadow: `0 0 0 2px ${varOf("color-input-active")}`,
  },

  // aria-invalid=true:
  '&[aria-invalid="true"]': {
    borderColor: varOf("color-destructive"),
    boxShadow: `0 0 0 2px ${varOf("color-destructive")}`,
  },

  // dark mode aria-invalid:
  '.dark &[aria-invalid="true"]': {
    boxShadow: `0 0 0 2px ${varOf("color-destructive")}`,
  },
};

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={`${cssOf(inputStyles)} ${className}`}
      {...props}
    />
  );
}
export { Input };
