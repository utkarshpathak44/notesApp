import SideBar from "./components/SideBar";
import FolderView from "./components/FolderView";
import NoteView from "./components/NoteView";

function App() {
  return (

    <div className="flex flex-row w-screen h-screen text-white font-sans">
      <SideBar />
      <FolderView/>
      <NoteView/>
    </div>
  );
}

export default App;
