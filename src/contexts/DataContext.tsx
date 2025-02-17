import { createContext, useContext, useState, ReactNode } from "react";

interface DataContextType {
  value: boolean;
  toggle: () => void;
//   setTrue: () => void;
//   setFalse: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState(false);

  const toggle = () => setValue((prev) => !prev);
//   const setTrue = () => setValue(true);
//   const setFalse = () => setValue(false);

  return (
    <DataContext.Provider value={{ value, toggle }}>
      {children}
    </DataContext.Provider>
  );
};

export const useBoolean = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
