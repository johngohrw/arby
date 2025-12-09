import { type CSSObject, Global } from "@emotion/react";
import { globalButtonStyles } from "../button/button";

export const GlobalThemeProvider = ({
  themeConfig,
}: {
  themeConfig: CSSObject;
}) => {
  return (
    <Global
      styles={{
        body: {
          background: "var(--color-bg)",
          color: "var(--color-fg)",
        },
        ...globalButtonStyles,
        ...themeConfig,
      }}
    />
  );
};
