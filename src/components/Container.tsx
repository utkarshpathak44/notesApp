import SideBar from "./SideBar";
import FolderView from "./FolderView";
import NoteView from "./NoteView";

const Container: React.FC = () => {

  return (
    <div className="flex relative overflow-hidden flex-row w-screen h-screen bg-brand-100 text-white font-sans">
      <SideBar />
      <FolderView  />
      <NoteView />
      {/* a dark/ligh mode toggle on the top right */}
      <div className="absolute w-16 h-16 bg-brand-900 rounded-full -top-10 -right-10 flex items-center hover:scale-10000 filter invert  transition-transform duration-200 justify-center  cursor-pointer mix-blend-difference">
        <div
          className="w-12 h-12 bg-white rounded-full z-9999"
        ></div>
      </div>
    </div>
  );
};

export default Container;
