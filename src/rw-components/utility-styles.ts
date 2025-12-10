import type { CSSObject } from "@emotion/react";
import { varOf } from "./style-helpers";

const staticUtils = {
  borderBox: { boxSizing: "border-box" },
  flex: { display: "flex" },
  inlineFlex: { display: "inline-flex" },
  flexRow: { flexDirection: "row" },
  flexCol: { flexDirection: "column" },
  alignCenter: { alignItems: "center" },
  alignStart: { alignItems: "flex-start" },
  alignEnd: { alignItems: "flex-end" },
  justifyCenter: { justifyContent: "center" },
  justifyStart: { justifyContent: "flex-start" },
  justifyEnd: { justifyContent: "flex-end" },
  block: { display: "block" },
  none: { display: "none" },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: { position: "absolute" },
  fixed: { position: "fixed" },
  relative: { position: "relative" },
  sticky: { position: "sticky" },
  hFull: { height: "100%" },
  wFull: { width: "100%" },
  hScreen: { height: "100vh" },
  wScreen: { width: "100vw" },
  minHScreen: { minHeight: "100vh" },
  minWScreen: { minWidth: "100vw" },
} as const satisfies Record<string, CSSObject>;

const dynamicUtils = {
  inset: (inset: number | string) => ({
    left: inset,
    right: inset,
    top: inset,
    bottom: inset,
  }),
  z: (index: number) => ({
    zIndex: index,
  }),
  top: (value: CSSObject["top"] = 0) => ({ top: value }),
  bottom: (value: CSSObject["bottom"] = 0) => ({ bottom: value }),
  left: (value: CSSObject["left"] = 0) => ({ left: value }),
  right: (value: CSSObject["right"] = 0) => ({ right: value }),
  rounded: (radius: CSSObject["borderRadius"] = "4px") => ({
    borderRadius: radius,
  }),
  border: (width: CSSObject["border"] = "1px") => ({
    borderWidth: width,
    borderColor: varOf("color-border"),
    borderStyle: "solid",
  }),
  borderColor: (color: CSSObject["borderColor"] = varOf("color-border")) => ({
    borderColor: color,
  }),
};

export const s = { ...staticUtils, ...dynamicUtils };
