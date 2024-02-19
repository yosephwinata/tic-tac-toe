import styled, { css } from "styled-components";
import IconXSvg from "/src/svg/IconXSvg";
import useViewportSize from "/src/hooks/useViewportSize";
import IconOSvg from "/src/svg/IconOSvg";
import { Cell } from "/src/utils/types/types";

const StyledXOCell = styled.button<{ disabled: boolean }>`
  width: 9.6rem;
  height: 9.6rem;
  background-color: ${(props) => props.theme.colors.semiDarkNavy};
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
  onCellClick: (rowIndex: number, colIndex: number) => void;
}

const XOCell: React.FC<XOCellProps> = ({
  value,
  rowIndex,
  colIndex,
  onCellClick,
}) => {
  const { isTablet, isDesktop } = useViewportSize();
  let width = "4rem";
  if (isTablet) width = "6.4rem";
  if (isDesktop) width = "6.4rem";

  const disabled = value !== null;

  return (
    <StyledXOCell
      disabled={disabled}
      onClick={() => onCellClick(rowIndex, colIndex)}
    >
      {value === "X" && <IconXSvg width={width} />}
      {value === "O" && <IconOSvg width={width} />}
    </StyledXOCell>
  );
};

export default XOCell;
