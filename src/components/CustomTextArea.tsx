import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { NoteDataInterface } from "../interfaces/ApiInterfaces";

interface CustomTextAreaProps {
  noteData: NoteDataInterface;
  sendPatchRequest: () => void;
  sendCreateRequest: () => void;
  setNoteData: React.Dispatch<React.SetStateAction<NoteDataInterface>>;
  hideAllOptions: () => void;
  setShowSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  noteData,
  sendPatchRequest,
  sendCreateRequest,
  setNoteData,
  hideAllOptions,
  setShowSaved,
}) => {
  const { noteId } = useParams();
  const [debouncedContent, setDebouncedContent] = useState(noteData.content);

  const handleTextWrapper = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteData((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  // save function
  const autoSave = useCallback(() => {
    if (noteId == "newnote") {
      sendCreateRequest();
    } else {
      sendPatchRequest();
    }
    setShowSaved((p) => !p);
  }, [noteId, sendCreateRequest, sendPatchRequest, setShowSaved]);

  //debouncing
  useEffect(() => {
    if (debouncedContent === noteData.content) return;

    const handler = setTimeout(() => {
      setDebouncedContent(noteData.content);
      console.log("Auto-saving...");
      autoSave();
    }, 2000);

    return () => clearTimeout(handler);
  }, [noteData.content, debouncedContent, autoSave]);

  //adding  event listener
  useEffect(() => {
    const handleSaveShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        console.log("Manually saving...");
        autoSave();
      }
    };

    document.addEventListener("keydown", handleSaveShortcut);
    return () => document.removeEventListener("keydown", handleSaveShortcut);
  }, [autoSave]);

  return (
    <textarea
      placeholder="Enter contents here..."
      className="w-full h-full text-l leading-relaxed focus:outline-none resize-none bg-brand-50"
      value={noteData.content}
      onChange={handleTextWrapper}
      onClick={hideAllOptions}
    ></textarea>
  );
};

export default CustomTextArea;
