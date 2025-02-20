import { useEffect, useState } from "react";
import { useNetwork } from "../../customHooks/useNetwork";
import { NavLink, useParams } from "react-router-dom";
import RecentsShimmer from "./RecentsShimmer";
import { useData } from "../../contexts/DataContext";
import { NoteInterface, RecentsResponseData } from "../../interfaces/ApiInterfaces";

import noteIcon from "../../assets/note.svg";
import noteDarkerIcon from "../../assets/noteDarker.svg";

const Recents = () => {
  const { noteId } = useParams();
  const { value } = useData();
  const [ShimmerOnce, setShimmerOnce] = useState<boolean>(true);

  const {
    data: recentsResponseData,
    // loading: recentsLoading,
    error: recentsError,
    fetchData: fetchRecents,
  } = useNetwork<RecentsResponseData>();

  useEffect(() => {
    fetchRecents("/notes/recent", "GET").then(() => setShimmerOnce(false));
  }, [fetchRecents, value]);

  if (recentsError) return <div>Error loading Recents.</div>;

  return (
    <div className="flex flex-col gap-2">
      <div className="px-5 text-brand-800">Recents</div>
      <div>
        {ShimmerOnce ? (
          <RecentsShimmer />
        ) : (
          recentsResponseData?.recentNotes?.map((data: NoteInterface) => (
            <NavLink
              key={data.id}
              to={`/folders/${data.folderId}/notes/${data.id}`}
            >
              <div
                className={`w-full p-2 h-10 px-4 flex flex-row gap-2 items-center transition-all ${
                  noteId === data.id ? "bg-amber-800" : "hover:bg-brand-100"
                }`}
              >
                <img
                  src={noteId === data.id ? noteIcon : noteDarkerIcon}
                  alt=""
                />
                <div
                  className={
                    noteId === data.id
                      ? "text-white font-semibold"
                      : "text-brand-800"
                  }
                >
                  {data.title.length > 28
                    ? data.title.slice(0, 28) + "..."
                    : data.title}
                </div>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
};

export default Recents;
