import { useState } from "react";
const recents = [
  "Reflection of the month of june",
  "Project proposal",
  "travel hehe",
];
const activeDocument = "Reflection of the month of june";
const activeFolder = "Personal";
const folders = ["Personal", "Work", "Finances", "Travel", "Events"];
const frequents = ["Favourites", "Trash", "Archived"];

const SideBar = () => {
  const [search, setSearch] = useState(false);

  return (
    <div className="flex flex-col h-full w-135 bg-[#181818] gap-4">
      <div className="flex flex-col gap-4  p-5">
        <div className="flex flex-row  justify-between h-10">
          <img src="./src/assets/logo.svg" alt="notwed" />
          <img src="./src/assets/search.svg" alt="search" width={20} />
        </div>
        <div className="flex flex-row ">
          {search ? (
            <input type="text" />
          ) : (
            <button className="flex flex-row w-full items-center bg-[#242424] justify-center py-2">
              <img src="./src/assets/add.svg" alt="" />
              <div>New Note</div>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="px-5 text-[#999999]">Recents</div>
        <div>
          {recents.map((data, index) => {
            return (
              <div
                className={`w-full p-2 px-4 flex flex-row gap-2 items-center ${
                  activeDocument === data ? "bg-amber-800" : ""
                }`}
                key={index}
              >
                <img src={`./src/assets/${!(activeDocument===data)?"noteDarker":"note"}.svg`} alt="" />
                <div className={!(activeDocument===data)?"text-[#999999]":"text-white font-semibold"}>{data}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row w-full px-5 justify-between">
          <div className="text-[#999999]">Folders</div>
          <img src="./src/assets/addFolder.svg" alt="" />
        </div>
        <div>
          {folders.map((data, index) => {
            return (
              <div
                className={`w-full p-2 px-4 flex flex-row gap-2 ${
                  activeFolder === data ? "bg-[#232323]" : ""
                }`}
                key={index}
              >
                <img src={`./src/assets/${(activeFolder===data)?"currentFolder":"otherFolder"}.svg`} alt="" />
                <div className={!(activeFolder===data)?"text-[#999999]":"text-white font-semibold"}>{data}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2 text-[#999999]">
        <div className="flex flex-row w-full px-5 justify-between">
          <div>More</div>
          <img src="./src/assets/addFolder.svg" alt="" />
        </div>
        <div>
          {frequents.map((data, index) => {
            return (
              <div
                className="w-full p-2 px-4   flex flex-row gap-2"
                key={index}
              >
                <img src={`./src/assets/${data}.svg`} alt="" />
                <div className="font-sans">{data}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SideBar;
