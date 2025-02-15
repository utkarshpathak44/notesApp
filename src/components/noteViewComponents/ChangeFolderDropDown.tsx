import { useEffect, useState } from "react";
import { useNetwork } from "../../CustomHooks/useNetwork";

const ChangeFolderDropDown = ({
  showFolder,
  setShowFolder,
  setNoteData,
  setAndNotifyData,
  setFolderName
}) => {
  const {
    data: foldersData,
    loading: isLoading,
    fetchData: getFolders,
  } = useNetwork();

  useEffect(() => {
    getFolders("/folders", "GET", null);
  }, []);

  return (
    <div className="absolute top-10 w-70 left-0 bg-[#222222] p-4 rounded-xl shadow-lg z-50">
      <h3 className="text-white mb-2">Move to</h3>

      {isLoading ? (
        <div className="text-gray-400">...</div>
      ) : (
        <ul className="text-white overflow-y-scroll h-100">
          {foldersData?.folders?.map((folder) => (
            <li
              key={folder.id}
              className="cursor-pointer p-2 hover:bg-[#333333] rounded"
              onClick={(e) => {
                setNoteData((prev) => ({
                  ...prev,
                  folderId: folder.id
                }));
                setAndNotifyData();
                setFolderName(folder.name)
              }}
            >
              {folder.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChangeFolderDropDown;
