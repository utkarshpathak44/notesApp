import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useNetwork } from "../../CustomHooks/useNetwork";
import { useToast } from "../../contexts/CustomToast";
import { useData } from "../../contexts/DataContext";

import addFolderIcon from "../../assets/addFolder.svg";
import currentFolderIcon from "../../assets/currentFolder.svg";
import otherFolderIcon from "../../assets/otherFolder.svg";
import trashIcon from "../../assets/trashLp.svg";
import restore from "../../assets/restore.svg";
import trashLight from "../../assets/Trash.svg";

import RecentsShimmer from "./RecentsShimmer";

import { FoldersResponse } from "../../interfaces/ApiInterfaces";

const Folders = () => {
  const showToast: any = useToast();
  const { folderId } = useParams();
  const navigate = useNavigate();
  const { setCurrentFolder } = useData();

  const {
    data: foldersResponseData,
    loading: foldersLoading,
    error: foldersError,
    fetchData: fetchFolders,
  } = useNetwork<FoldersResponse>();

  const [newFolder, setNewFolder] = useState("");
  const [addState, setAddState] = useState(true);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editedFolderName, setEditedFolderName] = useState("");
  const [deleted, setDeleted] = useState<string | null>("");
  const [ShimmerOnce, setShimmerOnce] = useState<boolean>(true);

  const { fetchData: CreateFolder } = useNetwork();
  const { fetchData: UpdateFolder } = useNetwork();
  // const { fetchData: DeleteFolder } = useNetwork();

  // useEffect(()=>{
  //   if(!foldersLoading)return;
  //   setShimmerOnce(true)
  // },[foldersLoading])

  const handleCreateFolder = async () => {
    await CreateFolder("/folders", "POST", { name: newFolder });
    await fetchFolders("/folders", "GET", {});
    setAddState(true);
    setNewFolder("");
    showToast(`Folder "${newFolder}" created`);
  };

  const handleRenameFolder = async (id: string) => {
    if (!editedFolderName.trim()) return;
    await UpdateFolder(`/folders/${id}`, "PATCH", { name: editedFolderName });
    await fetchFolders("/folders", "GET", {});
    setEditingFolderId(null);
    showToast("Folder renamed");
  };

  const handleDeleteFolder = async (id: string) => {
    await UpdateFolder(`/folders/${id}`, "DELETE", {});
    await fetchFolders("/folders", "GET", {});
    setDeleted(id);
    showToast("Folder deleted");
    navigate("/");
  };

  const handleRestoreFolder = async () => {
    await UpdateFolder(`/folders/${deleted}/restore`, "POST", {});
    await fetchFolders("/folders", "GET", {});
    setDeleted(null);
    showToast("folder restored");
  };

  useEffect(() => {
    fetchFolders("/folders", "GET", {}).then(() => setShimmerOnce(false));
  }, []);

  if (foldersError) return <div>Error loading folders.</div>;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row w-full px-5 justify-between">
        <div className="text-brand-800">Folders</div>
        <img
          src={addFolderIcon}
          alt="Add Folder"
          onClick={() => setAddState((prev) => !prev)}
          className="cursor-pointer"
        />
      </div>
      {deleted ? (
        <div
          className="w-full p-2 px-4 flex flex-row bg-amber-700 justify-between gap-2 py-2 cursor-pointer font-semibold"
          onClick={handleRestoreFolder}
        >
          <div>Restore deleted folder?</div>
          <img src={restore} alt="" />
        </div>
      ) : (
        <></>
      )}

      {!addState && !foldersLoading && (
        <div className="w-full p-2 px-4 flex flex-row bg-brand-200 gap-2 py-2">
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
        {ShimmerOnce ? (
          <>
            <RecentsShimmer />
            <RecentsShimmer />
          </>
        ) : (
          foldersResponseData?.folders?.map((data) => (
            <div key={data.id}>
              <div
                className={`w-full p-2 px-4 flex flex-row gap-2 transition-all ${
                  folderId === data.id ? "bg-brand-400" : "hover:bg-brand-100"
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
                        : "text-brand-800 flex flex-row justify-between w-full"
                    }
                  >
                    <NavLink
                      key={data.id}
                      to={`/folders/${data.id}`}
                      className=" w-60 h-full"
                      onClick={() => setCurrentFolder(data.name)}
                    >
                      {data.name.length > 28
                        ? data.name.slice(0, 28) + "..."
                        : data.name}
                    </NavLink>
                    <img
                      src={folderId === data.id ? trashLight : trashIcon}
                      //i want to store the current folder name in the setCurrent folder contaxt here
                      className="w-4 cursor-pointer"
                      alt=""
                      onClick={() => handleDeleteFolder(data.id)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Folders;
