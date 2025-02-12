// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import FolderView from "./components/FolderView";
import NoteView from "./components/NoteView";
import "@fontsource/source-sans-pro"


function App() {
  return (
    // <Router>
    //   <div className="app-container">
    //     <Navbar />
    //     <div className="content">
    //       <Routes>
    //         <Route path="/" element={<h1>Select a Folder</h1>} />

    //         <Route path="/:folderName" element={<FolderView />} />

    //         <Route path="/:folderName/:noteId" element={<NoteView />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
    <div className="flex flex-row w-screen h-screen text-white font-sans">
      <SideBar />
      <FolderView/>
      <NoteView/>
    </div>
  );
}

export default App;
