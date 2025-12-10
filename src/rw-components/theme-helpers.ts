import type { CSSObject } from "@emotion/react";

import { allComponentThemeVariables, baseVariables } from "./theme";

const themeVariables = {
  ...baseVariables,
  ...allComponentThemeVariables,
} as const;

export type ThemeBaseVarRawKey = keyof typeof baseVariables;
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
