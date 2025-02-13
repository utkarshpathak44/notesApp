import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import SideBar from "./components/SideBar";
import FolderView from "./components/FolderView";
import NoteView from "./components/NoteView";
import { ToastProvider } from "./contexts/CustomToast";

function App() {
  return (
    <Router>
      <ToastProvider>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-row w-screen h-screen text-white font-sans">
              <SideBar />
              <FolderView />
              <NoteView />
            </div>
          }
        />
        <Route
          path="folders/:folderId"
          element={
            <div className="flex flex-row w-screen h-screen text-white font-sans">
              <SideBar />
              <FolderView />
              <NoteView />
            </div>
          }
        />
        <Route
          path="folders/:folderId/notes/:noteId"
          element={
            <div className="flex flex-row w-screen h-screen text-white font-sans">
              <SideBar />
              <FolderView />
              <NoteView />
            </div>
          }
        />
        <Route
          path="trash"
          element={
            <div className="flex flex-row w-screen h-screen text-white font-sans">
              <SideBar />
              <FolderView />
              <NoteView />
            </div>
          }
        />
        <Route
          path="archived"
          element={
            <div className="flex flex-row w-screen h-screen text-white font-sans">
              <SideBar />
              <FolderView />
              <NoteView />
            </div>
          }
        />
        <Route
          path="favorites"
          element={
            <div className="flex flex-row w-screen h-screen text-white font-sans">
              <SideBar />
              <FolderView />
              <NoteView />
            </div>
          }
        />
      </Routes>
      </ToastProvider>
    </Router>
  );
}

export default App;
