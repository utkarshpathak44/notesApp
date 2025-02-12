import { useState } from "react";
import Recents from "./sidebarComponents/Recents"
import Folders from "./sidebarComponents/Folders";
import More from "./sidebarComponents/More";

const recents = [
  "Reflection of the month of june",
  "Project proposal",
  "travel hehe",
];
const activeFolderInit = "Personal";
const folders = ["Personal", "Work", "Finances", "Travel", "Events"];
const frequentsInit = ["Favourites", "Trash", "Archived"];

const SideBar = () => {
  const [recentFiles,setRecentFiles]=useState(recents);
  const [allFolders,setAllFolders]=useState(folders)
  const [currentFile,setCurrentFile] =useState("Reflection of the month of june");
  const [activeFolder,setActiveFolder]=useState(activeFolderInit)
  const [frequents,setFrequents]=useState(frequentsInit)
  const [currentFrequent,setCurrentFrequent]=useState("Favourites")

  const [search, setSearch] = useState(false);

  return (
    <div className="flex flex-col h-full w-135 bg-[#181818] gap-4">
      <div className="flex flex-col gap-4  p-5">
        <div className="flex flex-row  justify-between h-10">
          <img src="./src/assets/logo.svg" alt="notwed" />
          <img
            src={`./src/assets/${!search ? "search" : "close"}.svg`}
            alt="search"
            width={20}
            onClick={() => setSearch((p) => !p)}
            className={` ${search ? "duration-300" : ""} ease-in-out ${search ? "rotate-90" : "rotate-0"}`}          />
        </div>
        <div className="flex flex-row ">
          {search ? (
            <div className="flex flex-row w-full items-center bg-[#242424] px-2 gap-2 py-2">
              <img src="./src/assets/search.svg" alt="" />
              <input type="text"  placeholder="Search note" className="border-none focus:ring-0 outline-none w-full"/>
            </div>
          ) : (
            <button className="flex flex-row w-full items-center bg-[#242424] justify-center py-2">
              <img src="./src/assets/add.svg" alt="" />
              <div>New Note</div>
            </button>
          )}
        </div>
      </div>
          <Recents recentFiles={recentFiles} currentFile={currentFile} setCurrentFile={setCurrentFile}/>
          <Folders allFolders={allFolders} currentFolder={activeFolder} setCurrentFolder={setActiveFolder}/>
          <More frequents={frequents} currentFrequent={currentFrequent} setCurrentFrequent={setCurrentFrequent}/>
    </div>
  );
};
export default SideBar;
