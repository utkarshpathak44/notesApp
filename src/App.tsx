import SideBar from "./components/SideBar";
import FolderView from "./components/FolderView";
import NoteView from "./components/NoteView";
import { ToastProvider } from "./contexts/CustomToast";

function App() {
  return (
    <ToastProvider>
      <div className="flex flex-row w-screen h-screen text-white font-sans">
        <SideBar />
        <FolderView />
        <NoteView />
      </div>
    </ToastProvider>
  );
}

export default App;
