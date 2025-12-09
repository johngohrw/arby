import { Button } from "./rw-components/button/button";
import { createTheme, cssOf, s } from "./rw-components/helpers";
import { GlobalThemeProvider } from "./rw-components/theme-provider/theme-provider";

const themeConfig = createTheme({
  "color-primary": "green",
});

function App() {
  return (
    <>
      <GlobalThemeProvider themeConfig={themeConfig} />
      <div className={cssOf(s.flexCenter, s.minHScreen)}>
        <Button onClick={() => alert("hi")}>This is a button</Button>
      </div>
    </>
  );
}

export default App;
