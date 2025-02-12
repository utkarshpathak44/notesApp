import { useEffect, useState } from "react";

const SavedToolTip = ({ turnOff }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if(turnOff)return
    setTimeout(()=>{
        setVisible(false)
    },500)
  }, [turnOff]);
  return (
    <>
      <div className={`flex flex-row  w-80 gap-2 ${!visible?"hidden":""}`}>
        <div className={`flex border-t-2 border-l-2 border-r-2 border-b-4 border-[#555555]  text-[#555555] font-bold w-12 rounded-xl items-center justify-center ${!turnOff?"bg-white text-black border-white shadow-lg shadow-white/50 ":""}`}>
          Ctrl
        </div>
        <div className="text-[#555555] font-bold">+</div>
        <div className={`flex border-t-2 border-l-2 border-r-2 border-b-4 border-[#555555]  text-[#555555] font-bold w-9 rounded-xl items-center justify-center ${!turnOff?"bg-white text-black border-white shadow-lg shadow-white/50":""}`}>
          S
        </div>
        <div className="text-[#555555] font-bold">to save the document</div>
      </div>
    </>
  );
};
export default SavedToolTip;
