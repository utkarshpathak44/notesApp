import { useState } from "react";
interface CustomTextAreaProps {
  text: string;
  handleText: (value: string) => void;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  text,
  handleText,
}) => {
  const [textData, setTextData] = useState<string>(text);

  const handleTextWrapper = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextData(e.target.value);
    handleText(e.target.value);
  };
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
