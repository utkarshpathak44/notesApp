import SideBar from "./SideBar";
import FolderView from "./FolderView";
import NoteView from "./NoteView";
import { useState } from "react";

const Container: React.FC = () => {
  const [scale, setScale] = useState(100);
  return (
    <div className="flex relative overflow-hidden flex-row w-screen h-screen bg-brand-100 text-white font-sans">
      <SideBar />
      <FolderView />
      <NoteView />
      {/* a dark/ligh mode toggle on the top right */}
      <div
        className="absolute w-16 h-16 bg-[#222222] rounded-full -top-10 -right-10 flex items-center z-20  filter invert  transition-transform duration-200 justify-center pointer-events-none mix-blend-difference "
        style={{
          width: 70, // Fixed size for outer circle
          height: 70,
          transform: `scale(${scale})`,
        }}
      >
        <div
          className="pointer-events-auto w-12 h-12 bg-white rounded-full z-100 relative cursor-pointer hover:animate-pulse"
          style={{
            width: 48, // fixed size
            height: 48,
            transform: `scale(${1 / scale})`,
          }}
          onClick={() => setScale((prev) => (prev === 1 ? 100 : 1))}
        ></div>
      </div>
    </div>
  );
};

export default Container;
