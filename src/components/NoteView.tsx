import { useCallback, useEffect, useState, useMemo } from "react";
import CustomTextArea from "./CustomTextArea";
import { useToast } from "../contexts/CustomToast";
import SavedToolTip from "./SavedToolTip";
import { useNavigate, useParams } from "react-router-dom";
import { useNetwork } from "../customHooks/useNetwork";
import NoOpen from "./NoOpen";
import { NoteViewShimmer } from "./NoteViewShimmer";
import FileAttributesDropDown from "./noteViewComponents/FileAttributesDropDown";
import ChangeFolderDropDown from "./noteViewComponents/ChangeFolderDropDown";
import Restore from "./Restore";
import { useData } from "../contexts/DataContext";
import AutoSaveNotifier from "./noteViewComponents/AutoSaveNotifier";
import { NoteDataInterface, NoteInterface } from "../interfaces/ApiInterfaces";

import calenderIcon from "../assets/calender.svg";
import folderIcon from "../assets/otherFolder.svg";

const InitialData: NoteDataInterface = {
  folderId: "",
  title: "",
  content: "",
  isFavorite: false,
  isArchived: false,
};

const NoteView = () => {
  const { toggle } = useData();
  const [noteData, setNoteData] = useState<NoteDataInterface>(InitialData);
  const showToast = useToast();
  const { folderId, noteId, more } = useParams();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const [showSaved, setShowSaved] = useState(true);
  const [folderName, setFolderName] = useState("");
  const [noteOptions, setNoteOptions] = useState(false);
  const [showFolderChange, setShowFolderChange] = useState(false);

  const hideAllOptions = () => {
    setShowFolderChange(false);
    setNoteOptions(false);
  };

  const {
    data: noteResponseData,
    loading: loadingNote,
    fetchData: fetchNote,
  } = useNetwork<{ note: NoteInterface }>();

  const { fetchData: sendNote } = useNetwork<{ id: string }>();

  const updatedNote = useMemo(
    () => ({
      folderId: noteData.folderId || folderId,
      title: noteData.title,
      content: noteData.content,
      isFavorite: noteData.isFavorite,
      isArchived: noteData.isArchived,
    }),
    [noteData, folderId]
  );

  useEffect(() => {
    setIsDeleted(false)
    if (!noteId) return;

    if (noteId === "newnote") {
      setNoteData(InitialData);
      return;
    }

    fetchNote(`/notes/${noteId}`, "GET", {}).then((response) => {
      if (response?.note) {
        setNoteData({
          folderId: response.note.folderId || "",
          title: response.note.title,
          content: response.note.content,
          isFavorite: response.note.isFavorite,
          isArchived: response.note.isArchived,
        });
        setFolderName(response.note.folder?.name || "");
      }
    });

    hideAllOptions();
  }, [noteId,fetchNote]);

  const sendPatchRequest = useCallback(async () => {
    if (!noteId || noteId === "newnote") return;
    await sendNote(`/notes/${noteId}`, "PATCH", updatedNote);
  }, [noteId, sendNote, updatedNote]);

  const sendCreateRequest = useCallback(async () => {
    if (noteId !== "newnote") return;
    const response = await sendNote(`/notes`, "POST", updatedNote);
    if (response?.id) {
      console.log(response.id)
      toggle();
      showToast("Note Created");
      navigate(`/folders/${updatedNote.folderId}/notes/${response.id}`);
    }
  }, [noteId, sendNote, updatedNote, toggle, showToast, navigate]);

  const sendDeleteRequest = useCallback(async () => {
    if (!noteId) return;
    await sendNote(`/notes/${noteId}`, "DELETE", {});
    setIsDeleted(true);
    showToast("Note Deleted");
    toggle();
  }, [noteId, sendNote, showToast, toggle]);

  const sendRestoreDeletedRequest=useCallback(async()=>{
    if (!noteId) return;
    await sendNote(`/notes/${noteId}/restore`, "POST", null);
    setIsDeleted(true);
    showToast("Note Restored Deleted");
    toggle();
  },[noteId, sendNote, showToast, toggle])

  if (!loadingNote && more === "trash" && noteId !== undefined) {
    return (
      <Restore
        RestoreNote={sendRestoreDeletedRequest}
      />
    );
  }

  if (noteId === undefined || noteResponseData?.note?.deletedAt) {
    return (
      <div className="flex flex-col bg-brand-50 w-full h-full p-10 py-15 gap-8">
        <NoOpen />
      </div>
    );
  }

  return loadingNote ? (
    <NoteViewShimmer />
  ) : isDeleted ? (
    <Restore
      RestoreNote={() => {
        sendNote(`/notes/${noteId}/restore`, "POST", {});
        setIsDeleted(false);
        showToast("Note Restored");
        toggle();
      }}
    />
  ) : (
    <main className="flex flex-col bg-brand-50 w-full h-full p-10 py-15">
      <div className="w-full flex flex-row justify-between text-4xl">
        <div className="font-semibold w-full">
          <textarea
            className="focus:outline-none resize-none h-13 w-full"
            placeholder="Enter Title..."
            value={noteData.title}
            onChange={(e) =>
              setNoteData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        {noteId !== "newnote" && (
          <div
            className="flex border-2 border-stone-400 rounded-4xl w-9 h-9 items-center justify-center gap-1 hover:bg-brand-300 cursor-pointer"
            onClick={() => setNoteOptions((p) => !p)}
          >
            <div className="bg-stone-400 rounded-full w-1 h-1"></div>
            <div className="bg-stone-400 rounded-full w-1 h-1"></div>
            <div className="bg-stone-400 rounded-full w-1 h-1"></div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 relative pt-8 pb-8">
        {noteOptions && (
          <FileAttributesDropDown
            noteId={noteId}
            sendPatchRequest={sendPatchRequest}
            noteData={noteData}
            setNoteData={setNoteData}
            setIsDeleted={setIsDeleted}
            sendDeleteRequest={sendDeleteRequest}
          />
        )}
        <div className="flex flex-row gap-5 items-center">
          <img src={calenderIcon} alt="Calendar" />
          <div className="text-brand-800">Date</div>
          <time className="ml-10">
            {new Date(
              noteResponseData?.note?.createdAt || new Date()
            ).toLocaleDateString("en-GB")}
          </time>
        </div>
        <hr className="border-brand-300" />
        <div className="flex flex-row gap-5 items-center">
          <img src={folderIcon} alt="Folder" />
          <div
            className="text-brand-800 cursor-pointer hover:bg-brand-500"
            onClick={() => setShowFolderChange((p) => !p)}
          >
            Folder
          </div>
          {showFolderChange && (
            <ChangeFolderDropDown
              setNoteData={setNoteData}
              setFolderName={setFolderName}
              sendPatchRequest={sendPatchRequest}
            />
          )}
          <div className="ml-10">{folderName}</div>
        </div>
      </div>
      <CustomTextArea
      hideAllOptions={hideAllOptions}
        noteData={noteData}
        setNoteData={setNoteData}
        sendPatchRequest={sendPatchRequest}
        sendCreateRequest={sendCreateRequest}
        setShowSaved={setShowSaved}
      />
      {noteId === "newnote" ? (
        <SavedToolTip />
      ) : (
        <AutoSaveNotifier showSaved={showSaved} />
      )}
    </main>
  );
};

export default NoteView;
