import { Helmet, HelmetProvider } from "react-helmet-async";
import MainMenu from "./pages/MainMenu.tsx";
import GlobalStyles from "./styles/GlobalStyles.ts";

const App: React.FC = () => {
  return (
    <HelmetProvider>
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
      <MainMenu />
    </HelmetProvider>
  );
};

export default App;
