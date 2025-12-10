import { css } from "@emotion/css";
import type { ThemeVarRawKey } from "./theme";

export const cssOf = css;
export const varOf = (key: ThemeVarRawKey) => `var(--${String(key)})`;
