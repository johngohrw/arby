import type { CSSObject } from "@emotion/react";
import { allComponentThemeVariables } from "./theme-provider/theme-provider";

const themeVariables = {
  ["root-font-scale"]: "14px",
  ["color-bg"]: "#f9f9f9",
  ["color-fg"]: "black",
  ["color-primary"]: "#0f8bd5",
  ["color-border"]: "#888",
  ...allComponentThemeVariables,
} as const;

export type ThemeVarRawKey = keyof typeof themeVariables;
export type ThemeVarDashedKey = `--${ThemeVarRawKey}`;
export type ThemeMixinRaw = Partial<Record<ThemeVarRawKey, unknown>>;
export type ThemeMixinDashed = Partial<Record<ThemeVarDashedKey, unknown>>;

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
