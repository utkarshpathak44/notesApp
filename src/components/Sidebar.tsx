import { useEffect, useState } from "react";
import Recents from "./sidebarComponents/Recents";
import Folders from "./sidebarComponents/Folders";
import More from "./sidebarComponents/More";
import { useNetwork } from "../CustomHooks/useNetwork";
import RecentsShimmer from "./sidebarComponents/RecentsShimmer";
// import search from '.src/assets/search.svg';
// import { useNavigate } from "react-router-dom";


import logo from "../assets/logo.svg";
import searchIcon from "../assets/search.svg";
import closeIcon from "../assets/close.svg";
import addIcon from "../assets/add.svg"

const recents = [
  "Reflection of the month of june",
  "Project proposal",
  "travel hehe",
];
const activeFolderInit = "Personal";
const folders = ["Personal", "Work", "Finances", "Travel", "Events"];
const frequentsInit = ["Favourites", "Trash", "Archived"];

const SideBar = () => {
  const [recentFiles, setRecentFiles] = useState(recents);
  const [allFolders, setAllFolders] = useState(folders);
  const [currentFile, setCurrentFile] = useState(
    "Reflection of the month of june"
  );
  const [activeFolder, setActiveFolder] = useState(activeFolderInit);
  const [frequents, setFrequents] = useState(frequentsInit);
  const [currentFrequent, setCurrentFrequent] = useState("Favourites");

  const [search, setSearch] = useState(false);
  const data = {};

  const {
    data: recentsResponseData,
    loading: recentsLoading,
    error: recentsError,
    fetchData: fetchRecents,
  } = useNetwork();
  const {
    data: foldersResponseData,
    loading: foldersLoading,
    error: foldersError,
    fetchData: fetchFolders,
  } = useNetwork();

  useEffect(() => {
    fetchRecents("/api/notes/recent", "GET", data);
    fetchFolders("/api/folders", "GET", data);
  }, []);

  // useEffect(() => {});

  return (
    <div className="flex flex-col h-full w-135 bg-[#181818] gap-4">
      <div className="flex flex-col gap-4  p-5">
        <div className="flex flex-row  justify-between h-10">
          <img src={logo} alt="notwed" />
          <img
            src={search ? closeIcon : searchIcon}
            // src={!search?{search}:"./src/assets/close.svg"}
            alt="search"
            width={20}
            onClick={() => setSearch((p) => !p)}
            className={` ${search ? "duration-300" : ""} ease-in-out ${
              search ? "rotate-90" : "rotate-0"
            }`}
          />
        </div>
        <div className="flex flex-row ">
          {search ? (
            <div className="flex flex-row w-full items-center bg-[#242424] px-2 gap-2 py-2">
              <img src={searchIcon} alt="" />
              <input
                type="text"
                placeholder="Search note"
                className="border-none focus:ring-0 outline-none w-full"
              />
            </div>
          ) : (
            <button className="flex flex-row w-full items-center bg-[#242424] justify-center py-2 gap-1 hover:bg-[#292929]">
              <img src={addIcon} alt="" />
              <div>New Note</div>
            </button>
          )}
        </div>
      </div>
      {recentsLoading ? (
        <RecentsShimmer />
      ) : (
        <Recents
          recentsResponseData={recentsResponseData}
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
        />
      )}
      {foldersLoading ? (
        <RecentsShimmer />
      ) : (
        <Folders
          allFolders={foldersResponseData}
          currentFolder={activeFolder}
          setCurrentFolder={setActiveFolder}
          fetchFolders={fetchFolders}
          foldersLoading={foldersLoading}
        />
      )}

      <More
        frequents={frequents}
        currentFrequent={currentFrequent}
        setCurrentFrequent={setCurrentFrequent}
      />
      {/* <div>{responseData}</div> */}
    </div>
  );
};
export default SideBar;
