import { useEffect, useState } from "react";
import CustomTextArea from "./CustomTextArea";
import { useToast } from "../contexts/CustomToast";
import SavedToolTip from "./SavedToolTip";
import { useParams } from "react-router-dom";
import { useNetwork } from "../CustomHooks/useNetwork";
import NoOpen from "./NoOpen";
import { Link } from "react-router-dom";
import { NoteViewShimmer } from "./NoteViewShimmer";

import favouritesIcon from "../assets/Favourites.svg";
import trashIcon from "../assets/Trash.svg";
import archivedIcon from "../assets/Archived.svg";
import calenderIcon from "../assets/calender.svg"
import folderIcon from "../assets/otherFolder.svg"



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
  const [noteOptions, setNoteOptions] = useState(false);
  const [saveTrigger, setSaveTrigger] = useState(false);

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
    setNoteOptions(false)
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
        isFavorite: noteResponseData.note.isFavourite,
        isArchived: noteResponseData.note.isArchived,
      }));
    }
  }, [loadingNote, noteError, noteResponseData]);

  useEffect(() => {
    console.log("Note response data:", noteResponseData);
  }, [loadingNote, noteError, noteResponseData]);

  // Save the note when edited
  // const setAndNotifyData = async () => {
  //   // if (sendingNote) return;
  //   setTurnOff(false);

  //   setNoteData((prev) => {
  //     const updatedNote = {
  //       folderId,
  //       title: prev.title,
  //       content: prev.content,
  //       isFavorite: prev.isFavorite,
  //       isArchived: prev.isArchived,
  //     };

  //     const method = noteId === "newnote" ? "POST" : "PATCH";
  //     const endpoint =
  //       noteId === "newnote" ? "/notes" : `/notes/${noteId}`;
  //     console.log(noteId === "newnote" ? "POST" : "PATCH");
  //     // if (sendingNote) return prev;
  //     console.log(noteId === "newnote" ? "POST" : "PATCH");
  //     sendNote(endpoint, method, updatedNote);

  //     return prev;
  //   });

  //   if (sendingNoteError) {
  //     console.error("Error saving note:", sendingNoteError);
  //     return;
  //   }
  //   showToast("File saved");
  // }; REFACTORING THIS TO USE EFFECT
  const setAndNotifyData = () => {
    setSaveTrigger((prev) => !prev); // Toggle state to trigger useEffect
  };

  useEffect(() => {
    if (!saveTrigger) return;

    const saveData = async () => {
      setTurnOff(false);

      const updatedNote = {
        folderId,
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

      if (sendingNoteError) {
        console.error("Error saving note:", sendingNoteError);
        return;
      }
      showToast("File saved");
    };

    saveData();
  }, [saveTrigger]);

  if (noteId === undefined)
    return (
      <div className="flex flex-col bg-[#181818] w-full h-full p-10 py-15 gap-8">
        <NoOpen />
      </div>
    );

  return (
    loadingNote?<NoteViewShimmer/>:
    <div className="flex flex-col bg-[#181818] w-full h-full p-10 py-15 ">
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
        <div
          className="flex border-2 border-stone-400 rounded-4xl w-9 h-9 items-center justify-center gap-1 hover:bg-[#292929]"
          onClick={() => setNoteOptions((p) => !p)}
        >
          <div className="bg-stone-400 rounded-4xl w-1 h-1"></div>
          <div className="bg-stone-400 rounded-4xl w-1 h-1"></div>
          <div className="bg-stone-400 rounded-4xl w-1 h-1"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2 relative pt-8 pb-8">
        {noteOptions ? (
          <div className="absolute top-0 right-0 px-0 py-4 bg-[#242424] w-80 text-xl rounded-xl flex-col gap-2 ">
            <div
              className="flex h-15 flex-row gap-4 items-center  px-8 hover:bg-[#444444] cursor-pointer"
              onClick={(e) => {
                setNoteData((prev) => ({
                  ...prev,
                  isFavorite: noteData.isFavorite ? false : true,
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
              className="flex h-15 flex-row gap-4 items-center px-8 hover:bg-[#444444]"
              onClick={(e) => {
                setNoteData((prev) => ({
                  ...prev,
                  isArchived: noteData.isFavorite ? false : true,
                }));
                setAndNotifyData();
              }}
            >
              <img src={archivedIcon} alt="" className="w-6 h-6" />
              <div>
                {noteData.isArchived ? "Remove from archived" : "Archive"}
              </div>
            </div>
            <hr className="border-[#444444] my-3" />
            <Link to={`/folders/{}`}>
              <div
                className="flex h-15 flex-row gap-4 items-center px-8 hover:bg-[#7f4242]"
                onClick={() => {
                  sendNote(`/notes/${noteId}`, "DELETE", {});
                }}
              >
                <img src={trashIcon} alt="" className="w-6 h-6" />
                <div>Delete</div>
              </div>
            </Link>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-row gap-5">
          <div>
            <img src={calenderIcon} alt="Calendar" />
          </div>
          <div className="text-[#999999]">Date</div>
          <div className="ml-10">
            {" "}
            {new Date(noteResponseData?.note.createdAt).toLocaleDateString("en-GB")}
          </div>
        </div>
        <hr className="border-[#292929]" />
        <div className="flex flex-row gap-5">
          <div>
            <img src={folderIcon}alt="Folder" />
          </div>
          <div className="text-[#999999]">Folder</div>
          <div className="ml-10">{noteResponseData?.note.folder.name}</div>
        </div>
      </div>
      <CustomTextArea
        noteData={noteData}
        setAndNotifyData={setAndNotifyData}
        setNoteData={setNoteData}
      ></CustomTextArea>
      <SavedToolTip turnOff={turnOff} />
    </div>
  );
};

export default NoteView;
