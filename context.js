import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper(props) {
  const { value, children } = props;
  const [globalState, setGlobalState] = useState(value);
  return (
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
