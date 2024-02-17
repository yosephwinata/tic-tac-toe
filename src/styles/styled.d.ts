// src/styles/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      tablet: string;
      desktop: string;
    };
    colors: {
      darkCyan: string;
      cyan: string;
      lightCyan: string;
      darkYellow: string;
      yellow: string;
      lightYellow: string;
      veryDarkNavy: string;
      darkNavy: string;
      semiDarkNavy: string;
      gray: string;
      lightGray: string;
      darkGray: string;
      black: string;
    };
    // Add other theme properties as needed
  }
}
