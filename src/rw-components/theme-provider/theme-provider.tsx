import { type CSSObject, Global } from "@emotion/react";
import { globalButtonStyles } from "../button/button";
import { varOf } from "../helpers";

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
        ...globalButtonStyles,
        ...themeConfig,
      }}
    />
  );
};
