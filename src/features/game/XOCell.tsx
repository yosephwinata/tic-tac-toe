import styled, { ThemeContext, css } from "styled-components";
import IconXSvg from "/src/svg/IconXSvg";
import useViewportSize from "/src/hooks/useViewportSize";
import IconOSvg from "/src/svg/IconOSvg";
import { Cell, GameState, PlayerSymbol } from "/src/utils/types/types";
import { useContext } from "react";

const StyledXOCell = styled.button<{ disabled: boolean; $bgColor?: string }>`
  width: 9.6rem;
  height: 9.6rem;
  background-color: ${(props) => props.$bgColor};
  border: none;
  border-radius: 10px;
  box-shadow: 0 0.8rem ${(props) => props.theme.colors.veryDarkNavy};

  ${(props) =>
    props.disabled &&
    css`
      cursor: default;
    `}

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 14rem;
    height: 14rem;
    border-radius: 15px;
    box-shadow: 0 1rem ${(props) => props.theme.colors.veryDarkNavy};
  }
`;

interface XOCellProps {
  value: Cell;
  rowIndex: number;
  colIndex: number;
  gameState: GameState;
  currentPlayer: PlayerSymbol;
  onCellClick: (rowIndex: number, colIndex: number) => void;
}

const XOCell: React.FC<XOCellProps> = ({
  value,
  rowIndex,
  colIndex,
  gameState,
  currentPlayer,
  onCellClick,
}) => {
  const { isTablet, isDesktop } = useViewportSize();
  let width = "4rem";
  if (isTablet) width = "6.4rem";
  if (isDesktop) width = "6.4rem";

  const disabled = value !== null;
  const themeContext = useContext(ThemeContext);
  const cyanColor = themeContext?.colors?.cyan;
  const yellowColor = themeContext?.colors?.yellow;
  const semiDarkNavyColor = themeContext?.colors?.semiDarkNavy;

  let bgColor = semiDarkNavyColor;
  if (gameState === "wonOrLost") {
    if (value === "X" && currentPlayer === "X") bgColor = cyanColor;
    else if (value === "O" && currentPlayer === "O") bgColor = yellowColor;
  }

  return (
    <StyledXOCell
      disabled={disabled}
      $bgColor={bgColor}
      onClick={() => onCellClick(rowIndex, colIndex)}
    >
      {value === "X" && (
        <IconXSvg
          width={width}
          fillColor={
            gameState === "wonOrLost" && currentPlayer === "X"
              ? semiDarkNavyColor
              : cyanColor
          }
        />
      )}
      {value === "O" && (
        <IconOSvg
          width={width}
          fillColor={
            gameState === "wonOrLost" && currentPlayer === "O"
              ? semiDarkNavyColor
              : yellowColor
          }
        />
      )}
    </StyledXOCell>
  );
};

export default XOCell;
