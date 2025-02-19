import { useEffect, useState } from "react";
import Recents from "./sidebarComponents/Recents";
import Folders from "./sidebarComponents/Folders";
import More from "./sidebarComponents/More";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import logo from "../assets/logo.svg";
import searchIcon from "../assets/search.svg";
import closeIcon from "../assets/close.svg";
import addIcon from "../assets/add.svg";
import { useNetwork } from "../CustomHooks/useNetwork";
import { NoteInterface, noteResponseData } from "../interfaces/ApiInterfaces";


const SideBar = () => {
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  // const [EnterNewNode, setEnterNewNode] = useState(false);
  const { folderId } = useParams();

  const {
    data: searchResponseData,
    loading: loadingSearch,
    // error: searchError,
    fetchData: fetchNote,
  } = useNetwork<noteResponseData>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000);
  
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]); 
  
  useEffect(() => {
    // if (!debouncedSearchQuery) return; 
    fetchNote(`notes?page=1&limit=100&search=${debouncedSearchQuery}`, "GET", {});
    console.log(searchResponseData);
  }, [debouncedSearchQuery]);

  return (
    <aside className="flex flex-col h-full w-135 bg-brand-50  gap-4">
      <header className="flex flex-col gap-4  p-5">
        <div className="flex flex-row  justify-between h-10">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <img
              src={logo}
              alt="notwed"
              // className="filter grayscale brightness-75"
            />
          </div>
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
            <div className="flex relative flex-row w-full items-center bg-brand-200 px-2 gap-2 py-2">
              <img src={searchIcon} alt="" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search note"
                className="border-none focus:ring-0 outline-none w-full"
              />
              <img
                src={closeIcon}
                alt=""
                className="cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
              {!loadingSearch &&
              (searchResponseData?.notes?? []).length > 0 &&
              searchQuery != "" ? (
                <div className="absolute left-0 top-full pt-2 w-full h-200 bg-brand-100 text-white shadow-lg max-h-60 overflow-y-scroll z-10">
                  {searchResponseData?.notes.map((note: NoteInterface) => (
                    <NavLink
                      key={note.id}
                      to={`/folders/${note.folderId}/notes/${note.id}`}
                      className="block hover:bg-brand-600 p-2"
                    >
                      <div className="w-full">{note.title}</div>
                    </NavLink>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <NavLink
              className="flex flex-row w-full items-center"
              to={`/folders/${folderId}/notes/newnote`}
            >
              <button className="flex flex-row w-full items-center bg-brand-200 justify-center py-2 gap-1 hover:bg-brand-300 cursor-pointer">
                <img src={addIcon} alt="" />
                <div className="font-semibold">New Note</div>
              </button>
            </NavLink>
          )}
        </div>
      </header>
      <Recents />
      <Folders />
      <More />
    </aside>
  );
};
export default SideBar;
