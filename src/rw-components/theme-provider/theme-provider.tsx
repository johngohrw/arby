import { type CSSObject, Global } from "@emotion/react";

import { allComponentGlobalStyles, sensibleDefaults } from "../theme";

export const GlobalThemeProvider = ({
  themeConfig,
}: {
  themeConfig: CSSObject;
}) => {
  return (
    <Global
      styles={{
        ...sensibleDefaults,
        ...allComponentGlobalStyles,
        ...themeConfig,
      }}
    />
  );
};
