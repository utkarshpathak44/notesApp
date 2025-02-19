import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastProvider } from "./contexts/CustomToast";
import Container from "./components/Container";
import { PageNotFound } from "./components/PageNotFound";
import { DataProvider } from "./contexts/DataContext";

function App() {
  return (
    <Router>
      <DataProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Container />} />
            <Route path="folders/:folderId" element={<Container />} />
            <Route
              path="folders/:folderId/notes/:noteId"
              element={<Container />}
            />
            <Route path="/:more" element={<Container />} />
            <Route path="/:more/:noteId" element={<Container />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ToastProvider>
      </DataProvider>
    </Router>
  );
}

export default App;
