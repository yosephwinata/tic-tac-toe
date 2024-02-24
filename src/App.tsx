import { useState } from "react";
import { Helmet } from "react-helmet-async";
import styled, { createGlobalStyle } from "styled-components";
import resetCSS from "./styles/resetCSS";
import baseCSS from "./styles/baseCSS";
import MainMenu from "./pages/MainMenu";
import InGame from "./pages/InGame";
import { CurrentPage } from "./utils/types/types";
import { PlayerSymbol } from "./utils/types/types";

const GlobalStyles = createGlobalStyle`
  ${resetCSS}
  ${baseCSS}
`;

const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App: React.FC = () => {
  const [player1Symbol, setPlayer1Symbol] = useState<PlayerSymbol>("X");
  const [currentPage, setCurrentPage] = useState<CurrentPage>("mainMenu");

  const handleNewGameVsPlayer = (selectedSymbol: PlayerSymbol) => {
    setPlayer1Symbol(selectedSymbol);
    setCurrentPage("inGame");
  };

  let currentPageComponent;
  if (currentPage === "mainMenu") {
    currentPageComponent = (
      <MainMenu onNewGameVsPlayerClick={handleNewGameVsPlayer} />
    );
  } else if (currentPage === "inGame") {
    currentPageComponent = (
      <InGame player1Symbol={player1Symbol} setCurrentPage={setCurrentPage} />
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
    </StyledApp>
  );
};

export default App;
