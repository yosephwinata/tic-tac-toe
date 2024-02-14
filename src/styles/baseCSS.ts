import { css } from "styled-components";

const baseCSS = css`
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
