import styled from "styled-components";
import LogoSvg from "../svg/LogoSvg";
import TurnHint from "../ui/TurnHint";
import RestartSvg from "../svg/RestartSvg";

const InGame: React.FC = () => {
  return (
    <>
      <div>
        <LogoSvg />
        <TurnHint />
        <button>
          <RestartSvg />
        </button>
      </div>
    </>
  );
};

export default InGame;
