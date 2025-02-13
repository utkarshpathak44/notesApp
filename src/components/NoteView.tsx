import { useEffect, useState } from "react";
import CustomTextArea from "./CustomTextArea";
import { useToast } from "../contexts/CustomToast";
import SavedToolTip from "./SavedToolTip";
import { useParams } from "react-router-dom";
import { useNetwork } from "../CustomHooks/useNetwork";

const NoteView = () => {
  const [title, setTitle] = useState("A random note");
  const [textData, setTextData] = useState("");
  const showToast = useToast();
  const [turnOff, setTurnOff] = useState(true);
  const { folderId, noteId } = useParams();

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

  // if noteid changes, now note is fetched
  useEffect(() => {
    if (!noteId) {
      console.error("No noteId found");
      return;
    }

    console.log("Fetching note with ID:", noteId);
    fetchNote(`/api/notes/${noteId}`, "GET", {});
  }, [noteId]);

  // Update state when noteResponseData is received
  useEffect(() => {
    if (loadingNote) return;

    if (noteError) {
      console.error("Error loading note:", noteError);
      return;
    }

    if (noteResponseData?.title && noteResponseData?.content) {
      console.log("Fetched noteResponseData:", noteResponseData);
      setTitle(noteResponseData.title);
      setTextData(noteResponseData.content);
    }
  }, [noteResponseData, loadingNote, noteError]);

  // Save the note when edited
  const setAndNotifyData = async (someData: string) => {
    setTextData(someData);
    setTurnOff(false);

    if (!noteId) {
      console.error("Cannot save: noteId is missing.");
      return;
    }

    await sendNote(`/api/notes/${noteId}`, "PATCH", {
      folderId: folderId || null,
      title: title, // Use updated title state
      content: someData, // Use the latest input
    });

    if (sendingNoteError) {
      console.error("Error saving note:", sendingNoteError);
      return;
    }

    showToast("File saved");
  };

  return (
    <div className="flex flex-col bg-[#181818] w-full h-full p-10 py-15 gap-8">
      <div className="w-full flex flex-row justify-between text-4xl">
        <div className="font-semibold">{title}</div>
        <div className="flex border-2 border-stone-400 rounded-4xl w-9 h-9 items-center justify-center gap-1 hover:bg-[#292929]">
          <div className="bg-stone-400 rounded-4xl w-1 h-1"></div>
          <div className="bg-stone-400 rounded-4xl w-1 h-1"></div>
          <div className="bg-stone-400 rounded-4xl w-1 h-1"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-5">
          <div>
            <img src="./src/assets/calender.svg" alt="Calendar" />
          </div>
          <div className="text-[#999999]">Date</div>
          <div className="ml-10">current date</div>
        </div>
        <hr className="border-[#292929]" />
        <div className="flex flex-row gap-5">
          <div>
            <img src="./src/assets/otherFolder.svg" alt="Folder" />
          </div>
          <div className="text-[#999999]">Folder</div>
          <div className="ml-10">Personal</div>
        </div>
      </div>
      <CustomTextArea text={textData} setAndNotifyData={setAndNotifyData} />
      <SavedToolTip turnOff={turnOff} />
    </div>
  );
};

export default NoteView;
