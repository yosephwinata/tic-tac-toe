import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { createGlobalStyle } from "styled-components";
import resetCSS from "./styles/resetCSS";
import baseCSS from "./styles/baseCSS";
import MainMenu from "./pages/MainMenu";
import InGame from "./pages/InGame";
import { PlayerSymbol } from "./utils/enums/PlayerSymbol";
import { CurrentPage } from "./utils/enums/CurrentPage";

const GlobalStyles = createGlobalStyle`
  ${resetCSS}
  ${baseCSS}
`;

const App: React.FC = () => {
  const [player1Symbol, setPlayer1Symbol] = useState<PlayerSymbol | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState<CurrentPage>(
    CurrentPage.mainMenu
  );

  const handleNewGameVsPlayer = (selectedSymbol: PlayerSymbol) => {
    setPlayer1Symbol(selectedSymbol);
    setCurrentPage(CurrentPage.inGame);
  };

  let currentPageComponent;
  if (currentPage === CurrentPage.mainMenu) {
    currentPageComponent = (
      <MainMenu onNewGameVsPlayerClick={handleNewGameVsPlayer} />
    );
  } else if (currentPage === CurrentPage.inGame) {
    currentPageComponent = <InGame player1Symbol={player1Symbol} />;
  }

  return (
    <>
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
    </>
  );
};

export default App;
