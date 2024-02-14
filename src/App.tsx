import { Helmet } from "react-helmet-async";
import MainMenu from "./pages/MainMenu";
import InGame from "./pages/InGame";
import GlobalStyles from "./styles/GlobalStyles";

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
