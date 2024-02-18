import { DefaultTheme } from "styled-components";
import { breakpoints } from "../utils/constants/breakpoints";

// Important: Remember to update the styled.d.ts file whenever you update the code below.
// It is required to maximize typescript potentials
const theme: DefaultTheme = {
  breakpoints: {
    tablet: `${breakpoints.tablet / 16}em`,
    desktop: `${breakpoints.desktop / 16}em`,
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
