import { useEffect, } from "react";
interface CustomTextAreaProps {
  text: string;
  setAndNotifyData: () => void;
  setTextData:any
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  text,
  setAndNotifyData,
  setTextData
}) => {

  const handleTextWrapper = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextData(e.target.value);
  };

  useEffect(() => {
    const handleSaveShortcut = (event:any) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        setAndNotifyData();
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
      className="w-full h-full text-l leading-relaxed focus:outline-none resize-none bg-[#181818]"
      value={text}
      onChange={handleTextWrapper}
      onBlur={() => setAndNotifyData()}
    ></textarea>
  );
};
export default CustomTextArea;

