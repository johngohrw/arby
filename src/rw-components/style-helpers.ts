import { css } from "@emotion/css";
import type { ThemeBaseVarRawKey, ThemeVarRawKey } from "./theme-helpers";

export const cssOf = css;
export const varOf = (key: ThemeVarRawKey) => `var(--${String(key)})`;
export const baseVarOf = (key: ThemeBaseVarRawKey) => `var(--${String(key)})`;
