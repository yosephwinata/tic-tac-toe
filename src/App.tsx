import { useState } from "react";
import { Helmet } from "react-helmet-async";
import styled, { createGlobalStyle } from "styled-components";
import resetCSS from "./styles/resetCSS";
import baseCSS from "./styles/baseCSS";
import MainMenu from "./pages/MainMenu";
import InGame from "./pages/InGame";
import {
  AILevel,
  CurrentPage,
  GameMode,
  HandleNewGameVsAI,
} from "./utils/types/types";
import { PlayerSymbol } from "./utils/types/types";
import Credits from "./ui/Credits";

const GlobalStyles = createGlobalStyle`
  ${resetCSS}
  ${baseCSS}
`;

const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const App: React.FC = () => {
  const [player1Symbol, setPlayer1Symbol] = useState<PlayerSymbol>("X");
  const [gameMode, setGameMode] = useState<GameMode>("singleplayer");
  const [aiLevel, setAILevel] = useState<AILevel>("average");
  const [currentPage, setCurrentPage] = useState<CurrentPage>("mainMenu");

  const handleNewGameVsPlayer = (selectedSymbol: PlayerSymbol) => {
    setPlayer1Symbol(selectedSymbol);
    setGameMode("multiplayer");
    setCurrentPage("inGame");
  };

  const handleNewGameVsAI: HandleNewGameVsAI = (selectedSymbol, level) => {
    setPlayer1Symbol(selectedSymbol);
    setGameMode("singleplayer");
    setAILevel(level);
    setCurrentPage("inGame");
  };

  let currentPageComponent;
  if (currentPage === "mainMenu") {
    currentPageComponent = (
      <MainMenu
        onNewGameVsPlayerClick={handleNewGameVsPlayer}
        onNewGameVsAIClick={handleNewGameVsAI}
      />
    );
  } else if (currentPage === "inGame") {
    currentPageComponent = (
      <InGame
        player1Symbol={player1Symbol}
        gameMode={gameMode}
        aiLevel={aiLevel}
        setCurrentPage={setCurrentPage}
      />
    );
  }

  return (
    <StyledApp>
      <Helmet>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Google Fonts link for 'Outfit' font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyles />
      {currentPageComponent}
      <Credits />
    </StyledApp>
  );
};

export default App;
