import { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorageValue } from "@mantine/hooks";

const AppContext = createContext();

export function AppWrapper(props) {
  const { value, children } = props;
  const [globalState, setGlobalState] = useState(value);
  /* const [themeLocal, setThemeLocal] = useLocalStorageValue({
    key: "theme",
  });
  useEffect(() => {
    setGlobalState(themeLocal?.theme ?? "dark-theme");
  }, []);*/

  return (
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
