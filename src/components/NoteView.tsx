import { useEffect, useState } from "react";
import CustomTextArea from "./CustomTextArea";
import { useToast } from "../contexts/CustomToast";
import SavedToolTip from "./SavedToolTip";
import { useNavigate, useParams } from "react-router-dom";
import { useNetwork } from "../CustomHooks/useNetwork";
import NoOpen from "./NoOpen";
import { NoteViewShimmer } from "./NoteViewShimmer";
import FileAttributesDropDown from "./noteViewComponents/FileAttributesDropDown";
import ChangeFolderDropDown from "./noteViewComponents/ChangeFolderDropDown";
import Restore from "./Restore";

import calenderIcon from "../assets/calender.svg";
import folderIcon from "../assets/otherFolder.svg";

const NoteView = () => {
  const [noteData, setNoteData] = useState({
    folderId: "",
    title: "",
    content: "",
    isFavorite: false,
    isArchived: false,
  });

  const showToast = useToast();
  const [turnOff, setTurnOff] = useState(true);
  const { folderId, noteId } = useParams();
  const navigate = useNavigate();
  const [noteOptions, setNoteOptions] = useState(false);
  const [saveTrigger, setSaveTrigger] = useState(false);
  const [showFolderChange, setShowFolderChange] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const hideAllOptions = () => {
    setShowFolderChange(false);
    setNoteOptions(false);
  };

  // Fetch note data
  const {
    data: noteResponseData,
    loading: loadingNote,
    error: noteError,
    fetchData: fetchNote,
  } = useNetwork();

  // Save note data
  const {
    data: sentNoteData,
    loading: sendingNote,
    error: sendingNoteError,
    fetchData: sendNote,
  } = useNetwork();

  // Fetch the note when noteId changes
  useEffect(() => {
    if (!noteId) {
      return;
    }
    if (noteId === "newnote") {
      setNoteData({
        folderId: "",
        title: "",
        content: "",
        isFavorite: false,
        isArchived: false,
      });
      return;
    }
    console.log("Fetching note with ID:", noteId);
    fetchNote(`/notes/${noteId}`, "GET", {});
    setNoteOptions(false);
  }, [noteId]);

  // Update state when noteResponseData is received
  useEffect(() => {
    if (loadingNote) return;

    if (noteError) {
      console.error("Error loading note:", noteError);
      return;
    }

    if (!loadingNote && noteResponseData?.note) {
      console.log("Fetched noteResponseData:", noteResponseData);
      console.log("new title:", noteResponseData.note.title);
      setNoteData((prev) => ({
        ...prev,
        title: noteResponseData.note.title,
        content: noteResponseData.note.content,
        isFavorite: noteResponseData.note.isFavorite,
        isArchived: noteResponseData.note.isArchived,
      }));
      setFolderName(noteResponseData.note.folder.name);
    }
  }, [loadingNote, noteError, noteResponseData]);

  useEffect(() => {
    console.log("Note response data:", noteResponseData);
  }, [loadingNote, noteError, noteResponseData]);

  const setAndNotifyData = () => {
    if (folderId == "undefined") {
      showToast("Select a folder first");
      return;
    }
    setSaveTrigger((prev) => !prev); // Toggle state to trigger useEffect
  };

  useEffect(() => {
    if (!saveTrigger) return;

    const saveData = async () => {
      setTurnOff(false);

      const updatedNote = {
        folderId: noteData.folderId || folderId,
        title: noteData.title,
        content: noteData.content,
        isFavorite: noteData.isFavorite,
        isArchived: noteData.isArchived,
      };

      const method = noteId === "newnote" ? "POST" : "PATCH";
      const endpoint = noteId === "newnote" ? "/notes" : `/notes/${noteId}`;

      console.log(method);
      console.log("Sending note data:", updatedNote);

      await sendNote(endpoint, method, updatedNote);

      showToast("File saved");

      if (updatedNote.folderId !== folderId) {
        navigate(`/folders/${updatedNote.folderId}/notes/${noteId}`);
      }

      // setNoteData(prev=>)

      if (sendingNoteError) {
        console.error("Error saving note:", sendingNoteError);
        return;
      }
    };
    saveData();
  }, [saveTrigger]);

  if (noteId === undefined)
    return (
      <div className="flex flex-col bg-[#181818] w-full h-full p-10 py-15 gap-8">
        <NoOpen />
      </div>
    );

  return loadingNote ? (
    <NoteViewShimmer />
  ) : isDeleted ? (
    <Restore
      RestoreNote={() => {
        //this function restores the node
        sendNote(`/notes/${noteId}/restore`, "POST", {});
        setIsDeleted(false);
        showToast("Note Restored");
      }}
    />
  ) : (
    <main className="flex flex-col bg-[#181818] w-full h-full p-10 py-15">
      <div className="w-full flex flex-row justify-between text-4xl">
        <div className="font-semibold">
          <textarea
            className="focus:outline-none resize-none h-13"
            name=""
            id=""
            placeholder="Enter Title..."
            value={noteData.title}
            onChange={(e) =>
              setNoteData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          ></textarea>
        </div>
        {noteId == "newnote" ? (
          <></>
        ) : (
          <div
            className="flex border-2 border-stone-400 rounded-4xl w-9 h-9 items-center justify-center gap-1 hover:bg-[#292929]"
            onClick={() => setNoteOptions((p) => !p)}
          >
            <div className="bg-stone-400 rounded-4xl w-1 h-1"></div>
            <div className="bg-stone-400 rounded-4xl w-1 h-1"></div>
            <div className="bg-stone-400 rounded-4xl w-1 h-1"></div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 relative pt-8 pb-8">
        {noteOptions ? (
          <FileAttributesDropDown
            noteId={noteId}
            noteData={noteData}
            folderId={folderId}
            setNoteData={setNoteData}
            sendNote={sendNote}
            setAndNotifyData={setAndNotifyData}
            setIsDeleted={setIsDeleted}
          />
        ) : (
          <></>
        )}
        <div className="flex flex-row gap-5">
          <div>
            <img src={calenderIcon} alt="Calendar" />
          </div>
          <div className="text-[#999999]">Date</div>
          <time className="ml-10">
            {" "}
            {new Date(
              noteResponseData?.note.createdAt || new Date()
            ).toLocaleDateString("en-GB")}
          </time>
        </div>
        <hr className="border-[#292929]" />
        <div className="flex flex-row gap-5">
          <div>
            <img src={folderIcon} alt="Folder" />
          </div>
          <div
            className="text-[#999999]"
            onClick={() => setShowFolderChange((p) => !p)}
          >
            <div className=" hover:bg-[#444444] cursor-pointer transition-all">
              folder
            </div>
            {showFolderChange && (
              <ChangeFolderDropDown
                showFolder={showFolderChange}
                setShowFolder={setShowFolderChange}
                setNoteData={setNoteData}
                setAndNotifyData={setAndNotifyData}
                setFolderName={setFolderName}
              />
            )}
          </div>
          <div className="ml-10">{folderName}</div>
        </div>
      </div>
      <CustomTextArea
        noteData={noteData}
        setAndNotifyData={setAndNotifyData}
        setNoteData={setNoteData}
        hideAllOptions={hideAllOptions}
      ></CustomTextArea>
      <SavedToolTip turnOff={turnOff} />
    </main>
  );
};

export default NoteView;
