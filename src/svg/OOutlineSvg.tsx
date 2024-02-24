interface OOutlineProps {
  width?: string;
  isVisible?: boolean;
}

const OOutlineSvg: React.FC<OOutlineProps> = ({
  width = "6.4rem",
  isVisible = false,
}) => {
  // Apply width through style to leverage CSS's ability to handle "auto" values
  const svgStyle = {
    width,
    height: "auto",
    display: isVisible ? "block" : "none",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 66 66"
      style={svgStyle}
    >
      <path
        d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
        stroke="#F2B137"
        stroke-width="2"
        fill="none"
      />
    </svg>
  );
};

export default OOutlineSvg;
