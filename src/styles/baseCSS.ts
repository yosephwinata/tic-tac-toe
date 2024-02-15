import { css } from "styled-components";

const baseCSS = css`
  /* It is recommended to declare all global styles in the theme: .ts.
  I keep the :root here just to show this option.
  Only use :root for things that you know for sure are not going to be dynamically used. */
  :root {
    --weight-medium: 500;
    --weight-bold: 700;
  }

  body {
    font-family: "Outfit", sans-serif;
    background-color: ${(props) => props.theme.colors.darkNavy};
  }
`;

export default baseCSS;
