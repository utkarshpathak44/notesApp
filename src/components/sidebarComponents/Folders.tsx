import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNetwork } from "../../CustomHooks/useNetwork";

import addFolderIcon from "../../assets/addFolder.svg";
import currentFolderIcon from "../../assets/currentFolder.svg";
import otherFolderIcon from "../../assets/otherFolder.svg";
import RecentsShimmer from "./RecentsShimmer";

const Folders = () => {
  const { folderId } = useParams();

  const {
    data: foldersResponseData,
    loading: foldersLoading,
    error: foldersError,
    fetchData: fetchFolders,
  } = useNetwork();

  const [newFolder, setNewFolder] = useState("");
  const [addState, setAddState] = useState(true);

  const { fetchData: CreateFolder } = useNetwork();

  const handleCreateFolder = async () => {
    await CreateFolder("/api/folders", "POST", { name: newFolder });
    fetchFolders("/api/folders", "GET", {}); // Fetch updated folders
    setAddState(true);
    setNewFolder("");
  };

  useEffect(() => {
    fetchFolders("/api/folders", "GET", {});
  }, []);

  // if (foldersLoading) return <div>Loading...</div>;
  if (foldersError) return <div>Error loading folders.</div>;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row w-full px-5 justify-between">
        <div className="text-[#999999]">Folders</div>
        <img
          src={addFolderIcon}
          alt="Add Folder"
          onClick={() => setAddState((prev) => !prev)}
          className="cursor-pointer"
        />
      </div>

      {!addState && !foldersLoading && (
        <div className="w-full p-2 px-4 flex flex-row bg-[#242424] gap-2 py-2">
          <input
            type="text"
            placeholder="Type folder name..."
            className="border-none focus:ring-0 outline-none w-full bg-transparent text-white"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newFolder.trim()) {
                handleCreateFolder();
              }
            }}
          />
        </div>
      )}

      <div className="overflow-y-scroll h-70">
      {foldersLoading ? (<><RecentsShimmer/><RecentsShimmer/></>): (
        foldersResponseData?.folders?.map((data) => (
          <NavLink key={data.id} to={`/folders/${data.id}`}>
            <div
              className={`w-full p-2 px-4 flex flex-row gap-2 ${
                folderId === data.id ? "bg-[#333333]" : "hover:bg-[#222222]"
              }`}
            >
              <img
                src={folderId === data.id ? currentFolderIcon : otherFolderIcon}
                alt="Folder Icon"
              />
              <div
                className={
                  folderId === data.id ? "text-white font-semibold" : "text-[#999999]"
                }
              >
                {data.name}
              </div>
            </div>
          </NavLink>
        )))}
      </div>
    </div>
  );
};

export default Folders;
