import { type CSSObject, Global } from "@emotion/react";
import { buttonThemeVars, globalButtonStyles } from "../button/button";
import { varOf } from "../style-helpers";

export const allComponentThemeVariables = {
  ...buttonThemeVars,
};

export const allComponentGlobalStyles = {
  ...globalButtonStyles,
};

export const GlobalThemeProvider = ({
  themeConfig,
}: {
  themeConfig: CSSObject;
}) => {
  return (
    <Global
      styles={{
        [":root"]: {
          fontSize: varOf("root-font-scale"),
          background: varOf("color-bg"),
          color: varOf("color-fg"),
        },
        html: {},
        body: {},
        ...allComponentGlobalStyles,
        ...themeConfig,
      }}
    />
  );
};
