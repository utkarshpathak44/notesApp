import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNetwork } from "../../CustomHooks/useNetwork";

const Folders = ({ allFolders, currentFolder, setCurrentFolder }) => {
  const setFolder = (index) => {
    setCurrentFolder(allFolders.folders[index]);
  };
  const [newFolder, setNewFolder] = useState("");
  const [addState, setAddState] = useState(true);
  useEffect(() => {
    setCurrentFolder(allFolders.folders[0]);
  }, []);

  const data = {
    name: "newName",
  };

  const {
    data: foldersResponseData,
    loading: foldersLoading,
    error: foldersError,
    fetchData: CreateFolder,
  } = useNetwork();

  const handleCreateFolder = () => {
    CreateFolder("/api/folders", "POST", { name: newFolder });
    setAddState(true)
  };

  useEffect(()=>{
    console.log(foldersResponseData)
  },[foldersResponseData])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row w-full px-5 justify-between">
        <div className="text-[#999999]">Folders</div>
        <img
          src="./src/assets/addFolder.svg"
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
            <NavLink to={`/folders/${data.folderId}/notes/${data.id}`}>
              <div
                className={`w-full p-2 px-4 flex flex-row gap-2 ${
                  currentFolder === data ? "bg-[#333333]" : "hover:bg-[#222222]"
                }`}
                key={index}
                onClick={() => setFolder(index)}
              >
                <img
                  src={`./src/assets/${
                    currentFolder === data ? "currentFolder" : "otherFolder"
                  }.svg`}
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
