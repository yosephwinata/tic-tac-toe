import styled, { css } from "styled-components";

interface SizeStyles {
  [key: string]: ReturnType<typeof css>;
}

interface ColorStyles {
  [key: string]: ReturnType<typeof css>;
}

const sizes: SizeStyles = {
  large: css`
    height: 4.85rem;
    font-size: 1.6rem;
    font-weight: var(--weight-bold);
    letter-spacing: 1.25px;
    border-radius: 15px;

    @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
      height: 5.7rem;
      font-size: 2rem;
    }
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
    background-color: ${(props) => props.theme.colors.yellow};
    box-shadow: 0 0.75rem ${(props) => props.theme.colors.darkYellow};

    &:hover {
      background-color: ${(props) => props.theme.colors.lightYellow};
    }
  `,
  cyan: css`
    background-color: ${(props) => props.theme.colors.cyan};
    box-shadow: 0 0.75rem ${(props) => props.theme.colors.darkCyan};

    &:hover {
      background-color: ${(props) => props.theme.colors.lightCyan};
    }
  `,
  gray: css`
    background-color: ${(props) => props.theme.colors.gray};

    &:hover {
      background-color: ${(props) => props.theme.colors.lightGray};
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
