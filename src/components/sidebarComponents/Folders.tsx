import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNetwork } from "../../CustomHooks/useNetwork";
import { useToast } from "../../contexts/CustomToast";

import addFolderIcon from "../../assets/addFolder.svg";
import currentFolderIcon from "../../assets/currentFolder.svg";
import otherFolderIcon from "../../assets/otherFolder.svg";
import trashIcon from "../../assets/trashLp.svg";

import RecentsShimmer from "./RecentsShimmer";

const Folders = () => {
  const showToast = useToast();
  const { folderId, noteId } = useParams();

  const {
    data: foldersResponseData,
    loading: foldersLoading,
    error: foldersError,
    fetchData: fetchFolders,
  } = useNetwork();

  const [newFolder, setNewFolder] = useState("");
  const [addState, setAddState] = useState(true);
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editedFolderName, setEditedFolderName] = useState("");

  const { fetchData: CreateFolder } = useNetwork();
  const { fetchData: UpdateFolder } = useNetwork();
  const { fetchData: DeleteFolder } = useNetwork();

  const handleCreateFolder = async () => {
    await CreateFolder("/folders", "POST", { name: newFolder });
    fetchFolders("/folders", "GET", {});
    setAddState(true);
    setNewFolder("");
    showToast(`Folder "${newFolder}" created`);
  };

  const handleRenameFolder = async (id) => {
    if (!editedFolderName.trim()) return;
    await UpdateFolder(`/folders/${id}`, "PATCH", { name: editedFolderName });
    fetchFolders("/folders", "GET", {});
    setEditingFolderId(null);
    showToast("Folder renamed");
  };

  const handleDeleteFolder = async (id) => {
    await UpdateFolder(`/folders/${id}`, "DELETE", {});
    fetchFolders("/folders", "GET", {});
    showToast("Folder deleted");
  };

  useEffect(() => {
    fetchFolders("/folders", "GET", {});
  }, []);

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
        {foldersLoading ? (
          <>
            <RecentsShimmer />
            <RecentsShimmer />
          </>
        ) : (
          foldersResponseData?.folders?.map((data) => (
            <NavLink key={data.id} to={`/folders/${data.id}`}>
              <div
                className={`w-full p-2 px-4 flex flex-row gap-2 ${
                  folderId === data.id ? "bg-[#333333]" : "hover:bg-[#222222]"
                }`}
              >
                <img
                  src={
                    folderId === data.id ? currentFolderIcon : otherFolderIcon
                  }
                  alt="Folder Icon"
                />
                {editingFolderId === data.id ? (
                  <input
                    type="text"
                    value={editedFolderName}
                    onChange={(e) => setEditedFolderName(e.target.value)}
                    onBlur={() => setEditingFolderId(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRenameFolder(data.id);
                    }}
                    className="border-none focus:ring-0 outline-none w-full bg-transparent text-white"
                    autoFocus
                  />
                ) : (
                  <div
                    onDoubleClick={() => {
                      setEditingFolderId(data.id);
                      setEditedFolderName(data.name);
                    }}
                    className={
                      folderId === data.id
                        ? "text-white font-semibold flex flex-row justify-between w-full"
                        : "text-[#999999] flex flex-row justify-between w-full"
                    }
                  >
                    <div>{data.name}</div>
                    <img
                      src={trashIcon}
                      className="w-4"
                      alt=""
                      onClick={(e) => handleDeleteFolder(data.id)}
                    />
                  </div>
                )}
              </div>
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
};

export default Folders;
