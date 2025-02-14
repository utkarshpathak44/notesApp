import { useEffect, useState } from "react";

interface CustomTextAreaProps {
  noteData: any;
  setAndNotifyData: () => void;
  setNoteData: any;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  noteData,
  setAndNotifyData,
  setNoteData,
}) => {
  const [debouncedContent, setDebouncedContent] = useState(noteData.content);

  // Handle text input
  const handleTextWrapper = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setNoteData((prev: any) => ({
      ...prev,
      content: newContent,
    }));
    setDebouncedContent(newContent);
  };

  // Debounce effect: Save after 1 second of no typing
  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedContent !== noteData.content) {
        setAndNotifyData();
      }
    }, 1000); // Wait 1 second before saving

    return () => clearTimeout(handler);
  }, [debouncedContent]);

  // Ctrl + S shortcut to save
  useEffect(() => {
    const handleSaveShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        setAndNotifyData();
      }
    };

    document.addEventListener("keydown", handleSaveShortcut);
    return () => document.removeEventListener("keydown", handleSaveShortcut);
  }, []);

  return (
    <textarea
      placeholder="Enter contents here..."
      className="w-full h-full text-l leading-relaxed focus:outline-none resize-none bg-[#181818]"
      value={noteData.content}
      onChange={handleTextWrapper}
    ></textarea>
  );
};

export default CustomTextArea;
