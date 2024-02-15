import styled from "styled-components";
import Logo from "../svg/Logo";
import TurnHint from "../ui/TurnHint";

const InGame: React.FC = () => {
  return (
    <>
      <div>
        <Logo />
        <TurnHint />
        <button></button>
      </div>
    </>
  );
};

export default InGame;
