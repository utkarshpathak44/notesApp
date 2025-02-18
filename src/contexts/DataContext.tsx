import { createContext, useContext, useState, ReactNode } from "react";

interface DataContextType {
  value: boolean;
  toggle: () => void;
  currentFolder: string;
  setCurrentFolder: (folderName: string) => void; // Fixed type here
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<boolean>(false);
  const [currentFolder, setCurrentFolder] = useState<string>("");

  const toggle = () => setValue((prev) => !prev);

  return (
    <DataContext.Provider
      value={{ value, toggle, currentFolder, setCurrentFolder }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("err");
  }
  return context;
};
