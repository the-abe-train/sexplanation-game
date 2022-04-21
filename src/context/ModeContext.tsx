import { createContext, ReactNode, useEffect, useState } from "react";

// Use context as follows:
// ThemeProvider > ThemeContext > themeContext > theme & setTheme

type ProviderProps = {
  children: ReactNode;
};

type Mode = {
  hardMode: boolean;
};

type ModeContextType = {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>> | null;
};

const initialMode: Mode = { hardMode: false };

const initialModeContext: ModeContextType = {
  mode: initialMode,
  setMode: null,
};

export const ModeContext = createContext<ModeContextType>(initialModeContext);

export const ModeProvider = ({ children }: ProviderProps) => {
  const [mode, setMode] = useState(initialMode);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};
