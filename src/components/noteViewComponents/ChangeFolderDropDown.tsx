import { useEffect } from "react";
import { useNetwork } from "../../customHooks/useNetwork";

import {
  Folder,
  FoldersResponseInterface,
  NoteDataInterface,
} from "../../interfaces/ApiInterfaces";

interface ChangeFolderDropDownProps {
  setNoteData: React.Dispatch<React.SetStateAction<NoteDataInterface>>; // Function that accepts note data
  sendPatchRequest: () => Promise<void>; // Function that accepts no data and doesn't return anything
  setFolderName: (folderName: string) => void; // Function that accepts a string (folder name)
}

const ChangeFolderDropDown = ({
  setNoteData,
  sendPatchRequest,
  setFolderName,
}: ChangeFolderDropDownProps) => {
  const {
    data: foldersData,
    loading: isLoading,
    fetchData: getFolders,
  } = useNetwork<FoldersResponseInterface>();
  //fetching all the folders and if the user selects a new folder, a new request is sent

  useEffect(() => {
    getFolders("/folders", "GET", {});
  }, [getFolders]);

  return (
    <div className="absolute top-10 w-70 left-0 bg-brand-100 p-4 rounded-xl shadow-lg z-50">
      <h3 className="text-white mb-2">Move to</h3>

      {isLoading ? (
        <div className="text-gray-400">...</div>
      ) : (
        <ul className="text-white overflow-y-scroll h-100">
          {foldersData?.folders?.map((folder: Folder) => (
            <li
              key={folder.id}
              className="cursor-pointer p-2 hover:bg-brand-400 rounded"
              onClick={() => {
                setNoteData((prev: NoteDataInterface) => ({
                  ...prev,
                  folderId: folder.id,
                }));
                sendPatchRequest();
                setFolderName(folder.name);
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
