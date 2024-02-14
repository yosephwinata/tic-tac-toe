import styled from "styled-components";
import Logo from "../ui/Logo";
import TurnHint from "../ui/TurnHint";

const InGame: React.FC = () => {
  return (
    <>
      <div>
        <Logo />
        <TurnHint />
      </div>
    </>
  );
};

export default InGame;
