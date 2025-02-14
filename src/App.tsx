import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { ToastProvider } from "./contexts/CustomToast";
import Container from "./components/Container";
import { PageNotFound } from "./components/PageNotFound";

function App() {
  return (
    <Router>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="folders/:folderId" element={<Container />} />
          <Route
            path="folders/:folderId/notes/:noteId"
            element={<Container />}
          />
          <Route path="trash" element={<Container />} />
          <Route path="archived" element={<Container />} />
          <Route path="favorites" element={<Container />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ToastProvider>
    </Router>
  );
}

export default App;
