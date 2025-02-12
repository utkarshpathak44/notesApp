import { useState } from "react";
const recents = [
  "Reflection of the month of june",
  "Project proposal",
  "travel hehe",
];
const folders = ["Personal", "Work", "Finances", "Travel", "Events"];

const SideBar = () => {
  const [search, setSearch] = useState(false);

  return (
    <div className="flex flex-col h-full w-130 bg-stone-800">
      <div className="flex flex-col  p-5">
        <div className="flex flex-row border border-stone-400 justify-between h-10">
          <img src="./src/assets/logo.svg" alt="notwed" />
          <img src="./src/assets/search.svg" alt="search" />
        </div>
        <div className="flex flex-row border border-stone-400">
          {search ? (
            <input type="text" />
          ) : (
            <button className="flex flex-row w-full items-center justify-center py-2">
              <img src="./src/assets/add.svg" alt="" />
              <div>New Note</div>
            </button>
          )}
        </div>
      </div>
      <div>
        <div className="px-5">recents</div>
        {recents.map((data, index) => {
          return (
            <div
              className="w-full px-5 py-3 border border-stone-400 flex flex-row gap-2"
              key={index}
            >
              <img src="./src/assets/note.svg" alt="" />
              {data}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row w-full px-5 justify-between">
          <div>Folders</div>
          <img src="./src/assets/addFolder.svg" alt="" />
        </div>
        {folders.map((data, index) => {
          return (
            <div
              className="w-full px-5 py-3 border border-stone-400 flex flex-row gap-2"
              key={index}
            >
              <img src="./src/assets/note.svg" alt="" />
              <div className="font-sans">{data}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SideBar;
