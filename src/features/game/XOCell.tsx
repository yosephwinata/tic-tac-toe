import styled, { ThemeContext, css } from "styled-components";
import IconXSvg from "/src/svg/IconXSvg";
import useViewportSize from "/src/hooks/useViewportSize";
import IconOSvg from "/src/svg/IconOSvg";
import { Cell, PlayerSymbol, WinningCells } from "/src/utils/types/types";
import { useContext } from "react";

const StyledXOCell = styled.button<{ disabled: boolean; $bgColor?: string }>`
  width: 9.6rem;
  height: 9.6rem;
  background-color: ${(props) => props.$bgColor};
  border: none;
  border-radius: 10px;
  box-shadow: 0 0.75rem ${(props) => props.theme.colors.veryDarkNavy};

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
  winningCells: WinningCells;
  currentPlayer: PlayerSymbol;
  onCellClick: (rowIndex: number, colIndex: number) => void;
}

const XOCell: React.FC<XOCellProps> = ({
  value,
  rowIndex,
  colIndex,
  winningCells,
  currentPlayer,
  onCellClick,
}) => {
  const { isTablet, isDesktop } = useViewportSize();
  const disabled = value !== null;
  const themeContext = useContext(ThemeContext);
  const cyanColor = themeContext?.colors?.cyan;
  const yellowColor = themeContext?.colors?.yellow;
  const semiDarkNavyColor = themeContext?.colors?.semiDarkNavy;

  // Set the width of the icon depending on the device size
  let width = "4rem";
  if (isTablet) width = "6.4rem";
  if (isDesktop) width = "6.4rem";

  // Set a different background and icon color if this cell is part of the winning combination
  let bgColor = semiDarkNavyColor;
  let xIconColor = cyanColor;
  let OIconColor = yellowColor;
  winningCells.forEach((cell) => {
    if (cell[0] === rowIndex && cell[1] === colIndex) {
      xIconColor = semiDarkNavyColor;
      OIconColor = semiDarkNavyColor;
      if (value === "X" && currentPlayer === "X") bgColor = cyanColor;
      else if (value === "O" && currentPlayer === "O") bgColor = yellowColor;
    }
  });

  return (
    <StyledXOCell
      disabled={disabled}
      $bgColor={bgColor}
      onClick={() => onCellClick(rowIndex, colIndex)}
    >
      {value === "X" && <IconXSvg width={width} fillColor={xIconColor} />}
      {value === "O" && <IconOSvg width={width} fillColor={OIconColor} />}
    </StyledXOCell>
  );
};

export default XOCell;
