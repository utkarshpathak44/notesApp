import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNetwork } from "../../CustomHooks/useNetwork";

import addFolderIcon from "../../assets/addFolder.svg";
import currentFolderIcon from "../../assets/currentFolder.svg";
import otherFolderIcon from "../../assets/otherFolder.svg";

const Folders = ({ allFolders, currentFolder, setCurrentFolder,fetchFolders,foldersLoading }) => {
  const setFolder = (index) => {
    setCurrentFolder(allFolders.folders[index]);
  };
  const [newFolder, setNewFolder] = useState("");
  const [addState, setAddState] = useState(true);

  const handleClick = (e) => {
    const folderId = e.currentTarget.getAttribute("href").split("/").pop(); // Extract folder ID from NavLink
    const selectedFolder = allFolders.folders.find(
      (folder) => folder.id.toString() === folderId
    );

    if (selectedFolder) {
      setCurrentFolder(selectedFolder);
    }
  };

  const {
    data: foldersResponseData,
    loading: folderLoading,
    error: foldersError,
    fetchData: CreateFolder,
  } = useNetwork();


  const handleCreateFolder = async() => {
    await CreateFolder("/api/folders", "POST", { name: newFolder });
    setAddState(true);
    // setCurrentFolder(allFolders.folders[0])/
    //the problem here is to refresh the upper component when a new folder is created
    fetchFolders()
  };

  useEffect(() => {
    console.log(foldersResponseData);
  }, [foldersResponseData]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row w-full px-5 justify-between">
        <div className="text-[#999999]">Folders</div>
        <img
          src={addFolderIcon}
          alt=""
          onClick={() => setAddState((prev) => !prev)}
        />
      </div>

      {!addState ? (
        <div className="w-full p-2 px-4 flex flex-row bg-[#242424]  gap-2 py-2">
          <input
            type="text"
            placeholder="Type folder name..."
            className="border-none focus:ring-0 outline-none w-full"
            onChange={(e) => setNewFolder(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateFolder();
              }
            }}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="overflow-y-scroll h-100">
        {allFolders.folders.map((data, index) => {
          return (
            <NavLink
              key={data.id}
              to={`/folders/${data.id}`}
              onClick={handleClick}
            >
              <div
                className={`w-full p-2 px-4 flex flex-row gap-2 ${
                  currentFolder === data ? "bg-[#333333]" : "hover:bg-[#222222]"
                }`}
                onClick={() => setFolder(index)}
              >
                <img
                  src={currentFolder === data ? currentFolderIcon : otherFolderIcon}
                  alt=""
                />
                <div
                  className={
                    !(currentFolder === data)
                      ? "text-[#999999]"
                      : "text-white font-semibold"
                  }
                >
                  {data.name}
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Folders;
