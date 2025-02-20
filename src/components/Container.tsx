import SideBar from "./SideBar";
import FolderView from "./FolderView";
import NoteView from "./NoteView";
import { useEffect, useState } from "react";

const Container: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex relative overflow-hidden flex-row w-screen h-screen bg-brand-100 text-white font-sans">
      <SideBar />
      <FolderView />
      <NoteView />
      <div className="absolute w-16 h-16 bg-brand-600 rounded-full -top-10 -right-10 flex items-center justify-center hover:scale-120 transition-transform duration-200 cursor-pointer hover:animate-pulse">
  <div
    className="w-12 h-12 bg-brand-900 rounded-full "
    onClick={toggleTheme}
  ></div>
</div>
    </div>
  );
};

export default Container;
