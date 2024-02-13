import styled, { css } from "styled-components";

interface SizeStyles {
  [key: string]: ReturnType<typeof css>;
}

interface ColorStyles {
  [key: string]: ReturnType<typeof css>;
}

const sizes: SizeStyles = {
  large: css`
    font-size: 1.6rem;
    font-weight: var(--weight-bold);
    letter-spacing: 1.25px;
    border-radius: 15px;
    height: 5.6rem;
  `,
  small: css`
    font-size: 1.6rem;
    font-weight: var(--weight-bold);
    letter-spacing: 1px;
    border-radius: 10px;
  `,
};

const colors: ColorStyles = {
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
      background-color: var(--color-light-gray);
    }
  `,
};

interface ButtonProps {
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  $fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  color: var(--color-black);
  border: none;

  ${(props) => sizes[props.size || "large"]}
  ${(props) => colors[props.color || "yellow"]}
  width: ${(props) => (props.$fullWidth ? "100%" : "initial")};
`;

Button.defaultProps = {
  size: "large",
  color: "yellow",
};

export default Button;
