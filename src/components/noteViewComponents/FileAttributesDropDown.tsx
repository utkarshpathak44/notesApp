import trashIcon from "../../assets/Trash.svg";
import archivedIcon from "../../assets/Archived.svg";
import favouritesIcon from "../../assets/Favourites.svg";
import { useData } from "../../contexts/DataContext";

import { FileAttributesDropDownProps } from "../../interfaces/ApiInterfaces";

const FileAttributesDropDown = ({
  noteData,
  sendPatchRequest,
  setNoteData,
  sendDeleteRequest,
  setIsDeleted,
}:FileAttributesDropDownProps) => {
  const {toggle}=useData()
  return (
    <div className="absolute top-0 right-0 px-0 py-4 bg-brand-200 w-80 text-xl rounded-xl flex-col gap-2 ">
      <div
        className="flex h-15 flex-row gap-4 items-center  px-8 hover:bg-brand-500 cursor-pointer"
        onClick={() => {
          setNoteData((prev) => ({
            ...prev,
            isFavorite: !prev.isFavorite,
          }));
          sendPatchRequest();
        }}
      >
        <img src={favouritesIcon} alt="" className="w-6 h-6 " />
        <div>
          {noteData.isFavorite
            ? "Remove from Favourites"
            : "Add to favourites"}
        </div>
      </div>
      <div
        className="flex h-15 flex-row gap-4 items-center px-8 hover:bg-brand-500 cursor-pointer"
        onClick={() => {
          setNoteData((prev) => ({
            ...prev,
            isArchived: !prev.isArchived,
          }));
          sendPatchRequest();
        }}
      >
        <img src={archivedIcon} alt="" className="w-6 h-6" />
        <div>{noteData.isArchived ? "Remove from archived" : "Archive"}</div>
      </div>
      <hr className="border-brand-500 my-3" />
      <div
        className="flex h-15 flex-row gap-4 items-center px-8 hover:bg-amber-700 cursor-pointer"
        onClick={() => {
          sendDeleteRequest()
          setIsDeleted(true);
          toggle()
        }}
      >
        <img src={trashIcon} alt="" className="w-6 h-6" />
        <div>Delete</div>
      </div>
    </div>
  );
};
export default FileAttributesDropDown;
