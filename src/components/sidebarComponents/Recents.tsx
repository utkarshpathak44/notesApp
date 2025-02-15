import { useEffect } from "react";
import noteIcon from "../../assets/note.svg";
import noteDarkerIcon from "../../assets/noteDarker.svg";
import { useNetwork } from "../../CustomHooks/useNetwork";
import { NavLink, useParams } from "react-router-dom";
import RecentsShimmer from "./RecentsShimmer";

const Recents = () => {
  const { folderId, noteId } = useParams();

  const {
    data: recentsResponseData,
    loading: recentsLoading,
    error: recentsError,
    fetchData: fetchRecents,
  } = useNetwork();

  useEffect(() => {
    fetchRecents("/notes/recent", "GET", {});
  }, []);

  if (recentsError) return <div>Error loading Recents.</div>;


  return (
    <div className="flex flex-col gap-2">
      <div className="px-5 text-[#999999]">Recents</div>
      <div>
        {recentsLoading ? <RecentsShimmer/> : (
          recentsResponseData?.recentNotes?.map((data) => (
            <NavLink key={data.id} to={`/folders/${data.folderId}/notes/${data.id}`}>
              <div
                className={`w-full p-2 h-10 px-4 flex flex-row gap-2 items-center transition-all ${
                  noteId === data.id ? "bg-amber-800" : "hover:bg-[#222222]"
                }`}
              >
                <img src={noteId === data.id ? noteIcon : noteDarkerIcon} alt="" />
                <div
                  className={
                    noteId === data.id ? "text-white font-semibold" : "text-[#999999]"
                  }
                >
                  {data.title}
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
