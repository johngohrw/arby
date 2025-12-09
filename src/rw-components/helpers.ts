/** biome-ignore-all lint/correctness/noUnusedVariables: completion's sake */

import { css } from "@emotion/css";
import type { CSSObject } from "@emotion/react";

export const cssOf = css;

const themeVariables = {
  ["color-bg"]: "#f9f9f9",
  ["color-fg"]: "black",
  ["color-primary"]: "red",
  ["color-button-fg"]: "#f9f9f9",
  ["color-button-bg-disabled"]: "#999",
} as const;

type ThemeVarRawKey = keyof typeof themeVariables;
type ThemeVarDashedKey = `--${ThemeVarRawKey}`;
type ThemeMixinRaw = Partial<Record<ThemeVarRawKey, unknown>>;
type ThemeMixinDashed = Partial<Record<ThemeVarDashedKey, unknown>>;

export const createTheme = (mixin?: ThemeMixinRaw) => {
  const dashify = (o: Record<string, unknown>) =>
    Object.entries(o).reduce((a, [k, v]) => ({ ...a, [`--${k}`]: v }), {});

  const themeVariablesDashed = dashify(themeVariables);
  const themeMixinDashed = dashify(mixin ?? {});

  return {
    html: {
      ...themeVariablesDashed,
      ...themeMixinDashed,
    },
  } as CSSObject;
};

export const varOf = (key: ThemeVarRawKey) => `var(--${key})`;

const cssuStatic = {
  flex: { display: "flex" },
  block: { display: "block" },
  none: { display: "none" },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: { position: "absolute" },
  fixed: { position: "fixed" },
  relative: { position: "relative" },
  hFull: { height: "100%" },
  wFull: { width: "100%" },
  hScreen: { height: "100vh" },
  wScreen: { width: "100vw" },
  minHScreen: { minHeight: "100vh" },
  minWScreen: { minWidth: "100vw" },
} as const satisfies Record<string, CSSObject>;

const cssuDynamic = {
  inset: (inset: number | string) => ({
    left: inset,
    right: inset,
    top: inset,
    bottom: inset,
  }),
  z: (index: number) => ({
    zIndex: index,
  }),
  rounded: (radius: string | number) => ({ borderRadius: radius }),
};

export const s = { ...cssuStatic, ...cssuDynamic };
