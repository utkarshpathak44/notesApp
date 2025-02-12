import { useEffect, useState } from "react";
interface CustomTextAreaProps {
  text: string;
  setAndNotifyData: (value: string) => void;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  text,
  setAndNotifyData,
}) => {
  const [textData, setTextData] = useState<string>(text);

  const handleTextWrapper = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextData(e.target.value);
  };

  useEffect(() => {
    const handleSaveShortcut = (event:any) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        setAndNotifyData(textData);
    }
    };

    document.addEventListener("keydown", handleSaveShortcut);

    return () => {
      document.removeEventListener("keydown", handleSaveShortcut);
    };
  }, []);



  return (
    <textarea
      name=""
      id=""
      className="w-full h-full text-l font-utk leading-relaxed focus:outline-none resize-none bg-[#181818]"
      value={textData}
      onChange={handleTextWrapper}
    ></textarea>
  );
};
export default CustomTextArea;

