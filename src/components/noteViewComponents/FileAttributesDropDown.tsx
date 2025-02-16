import trashIcon from "../../assets/Trash.svg";
import archivedIcon from "../../assets/Archived.svg";
import favouritesIcon from "../../assets/Favourites.svg";

const FileAttributesDropDown = ({
  noteId,
  folderId,
  noteData,
  setNoteData,
  sendNote,
  setAndNotifyData,
  setIsDeleted,
}) => {
  return (
    <div className="absolute top-0 right-0 px-0 py-4 bg-[#242424] w-80 text-xl rounded-xl flex-col gap-2 ">
      <div
        className="flex h-15 flex-row gap-4 items-center  px-8 hover:bg-[#444444] cursor-pointer"
        onClick={() => {
          setNoteData((prev) => ({
            ...prev,
            isFavorite: prev.isFavorite ? false : true,
          }));
          setAndNotifyData();
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
        className="flex h-15 flex-row gap-4 items-center px-8 hover:bg-[#444444] cursor-pointer"
        onClick={() => {
          setNoteData((prev) => ({
            ...prev,
            isArchived: prev.isArchived?false:true,
          }));
          setAndNotifyData();
        }}
      >
        <img src={archivedIcon} alt="" className="w-6 h-6" />
        <div>{noteData.isArchived ? "Remove from archived" : "Archive"}</div>
      </div>
      <hr className="border-[#444444] my-3" />
      <div
        className="flex h-15 flex-row gap-4 items-center px-8 hover:bg-amber-700 cursor-pointer"
        onClick={() => {
          sendNote(`/notes/${noteId}`, "DELETE", {});
          setIsDeleted(true);
        }}
      >
        <img src={trashIcon} alt="" className="w-6 h-6" />
        <div>Delete</div>
      </div>
    </div>
  );
};
export default FileAttributesDropDown;
