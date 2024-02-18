// ARCHIVED

import { createContext, useContext, useState, ReactNode } from "react";

interface SymbolContextType {
  player1Symbol: string | undefined;
  setPlayer1Symbol: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SymbolContext = createContext<SymbolContextType | undefined>(undefined);

interface SymbolProviderProps {
  children: ReactNode;
}

const SymbolProvider: React.FC<SymbolProviderProps> = ({ children }) => {
  const [player1Symbol, setPlayer1Symbol] = useState<string | undefined>(
    undefined
  );

  return (
    // Anything that you pass through the "value" prop will be available globally
    <SymbolContext.Provider value={{ player1Symbol, setPlayer1Symbol }}>
      {children}
    </SymbolContext.Provider>
  );
};

const useSymbol = (): SymbolContextType => {
  const context = useContext(SymbolContext);
  if (context == undefined)
    throw new Error("SymbolContext was used outside the SymbolProvider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { SymbolProvider, useSymbol };
