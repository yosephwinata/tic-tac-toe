import styled, { css } from "styled-components";

const sizes = {
  large: css`
    font-size: 2rem;
    font-weight: var(--weight-bold);
    letter-spacing: 1.25px;
    border-radius: 15px;
  `,
  small: css`
    font-size: 1.6rem;
    font-weight: var(--weight-bold);
    letter-spacing: 1px;
    border-radius: 10px;
  `,
};

const colors = {
  yellow: css`
    background-color: var(--color-yellow);

    &:hover {
      background-color: var(--color-light-yellow);
    }
  `,
  cyan: css`
    background-color: var(--color-cyan);

    &:hover {
      background-color: var(--color-light-cyan);
    }
  `,
  gray: css`
    background-color: var(--color-gray);

    &:hover {
      background-color: var(--color-light-gray @);
    }
  `,
};

const Button = styled.button`
  color: var(--color-black);

  ${(props) => sizes[props.size]}
  ${(props) => colors[props.color]}
`;

Button.defaultProps = {
  size: "large",
  color: "yellow",
};

export default Button;
