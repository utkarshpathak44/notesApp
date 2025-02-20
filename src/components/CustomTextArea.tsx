import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NoteDataInterface } from "../interfaces/ApiInterfaces";

interface CustomTextAreaProps {
  noteData: NoteDataInterface;
  setAndNotifyData: () => void;
  setNoteData: React.Dispatch<React.SetStateAction<NoteDataInterface>>;
  hideAllOptions: () => void;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  noteData,
  setAndNotifyData,
  setNoteData,
  hideAllOptions,
}) => {
  const [debouncedContent, setDebouncedContent] = useState(noteData.content);
  const { noteId } = useParams();

  const handleTextWrapper = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setNoteData((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  // Update debouncedContent only when noteData.content changes
  useEffect(() => {
    setDebouncedContent(noteData.content);
    console.log("setting debounced value");
  }, [noteData.content]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (noteId !== "newnote" && debouncedContent == noteData.content) {
        console.log(noteId);
        console.log("autosaving");
        setAndNotifyData();
      }
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [noteData.content, debouncedContent]);

  useEffect(() => {
    const handleSaveShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        console.log("manually saving");
        setAndNotifyData();
      }
    };

    document.addEventListener("keydown", handleSaveShortcut);
    return () => document.removeEventListener("keydown", handleSaveShortcut);
  }, []);

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
