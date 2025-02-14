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
import addIcon from "../assets/add.svg";

const recents = [
  "Reflection of the month of june",
  "Project proposal",
  "travel hehe",
];
const activeFolderInit = "Personal";
const folders = ["Personal", "Work", "Finances", "Travel", "Events"];

const SideBar = () => {
  const [search, setSearch] = useState(false);
  const [EnterNewNode,setEnterNewNode] =useState(false)
  // useEffect(() => {});

  return (
    <div className="flex flex-col h-full w-135 bg-[#181818] gap-4">
      <div className="flex flex-col gap-4  p-5">
        <div className="flex flex-row  justify-between h-10">
          <img src={logo} alt="notwed" />
          <img
            src={search ? closeIcon : searchIcon}
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
              <div className="font-semibold">New Note</div>
            </button>
          )}
        </div>
      </div>
      <Recents />
      <Folders />
      <More />
    </div>
  );
};
export default SideBar;
