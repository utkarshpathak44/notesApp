// import { useEffect, useState } from "react";

const SavedToolTip = () => {
  //not using the dissappearing logic anymore
  // const [visible, setVisible] = useState(true);
  // useEffect(() => {
  //   if(turnOff)return
  //   setTimeout(()=>{
  //       setVisible(false)
  //   },500)
  // }, [turnOff]);
  return (
    <>
      <div className={`flex flex-row  w-80 gap-2`}>
        <div
          className={`flex border-t-2 border-l-2 border-r-2 border-b-4 border-brand-600  text-brand-600 font-bold w-12 rounded-xl items-center justify-center`}
        >
          Ctrl
        </div>
        <div className="text-brand-600 font-bold">+</div>
        <div
          className={`flex border-t-2 border-l-2 border-r-2 border-b-4 border-brand-600  text-brand-600 font-bold w-9 rounded-xl items-center justify-center `}
        >
          S
        </div>
        <div className="text-brand-600 font-bold">to create the document</div>
      </div>
    </>
  );
};
export default SavedToolTip;
