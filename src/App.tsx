import { Helmet } from "react-helmet-async";
import { createGlobalStyle } from "styled-components";
import resetCSS from "./styles/resetCSS";
import baseCSS from "./styles/baseCSS";
import MainMenu from "./pages/MainMenu";
import InGame from "./pages/InGame";

const GlobalStyles = createGlobalStyle`
  ${resetCSS}
  ${baseCSS}
`;

const App: React.FC = () => {
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

      {/* <MainMenu /> */}
      <InGame />
    </>
  );
};

export default App;
