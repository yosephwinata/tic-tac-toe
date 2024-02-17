import { DefaultTheme } from "styled-components";

// Important: Remember to update the styled.d.ts file whenever you update the code below.
// It is required to maximize typescript potentials
const theme: DefaultTheme = {
  // Don't forget to update the breakpoints in the useViewportSize hook if you change them here
  breakpoints: {
    tablet: "48em", // 768px
    desktop: "64em", // 1024px
  },
  colors: {
    darkCyan: "rgba(32, 137, 132, 1)",
    cyan: "#31C3BD",
    lightCyan: "#65E9E4",
    darkYellow: "rgba(197, 139, 30, 1)",
    yellow: "#F2B137",
    lightYellow: "#FFC860",
    veryDarkNavy: "#111E25",
    darkNavy: "#1A2A33",
    semiDarkNavy: "#1F3641",
    gray: "#A8BFC9",
    lightGray: "#D8E8ED",
    darkGray: "#76838B",
    black: "#000",
  },
  // Define other theme properties below as needed
};

export default theme;
