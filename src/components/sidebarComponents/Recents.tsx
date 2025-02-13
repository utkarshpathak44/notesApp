import { useEffect } from "react";
import noteIcon from "../../assets/note.svg";
import noteDarkerIcon from "../../assets/noteDarker.svg";
import { useNetwork } from "../../CustomHooks/useNetwork";
import { useParams } from "react-router-dom";

const Recents = () => {

  const {folderId,noteId}=useParams()


  const {
    data: recentsResponseData,
    loading: recentsLoading,
    error: recentsError,
    fetchData: fetchRecents,
  } = useNetwork();

  useEffect(() => {
    fetchRecents("/api/notes/recent", "GET", {});
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="px-5 text-[#999999]">Recents</div>
      <div>
        {!recentsLoading&&recentsResponseData.recentNotes.map((data, index) => {
          return (
            <div
              className={`w-full p-2 h-10 px-4 flex flex-row gap-2 items-center ${
                noteId === data
                  ? "bg-amber-800"
                  : "hover:bg-[#222222]"
              }`}
              key={index}
            >
              <img
                src={noteId === data.id ? noteIcon: noteDarkerIcon}

                alt=""
              />
              <div
                className={
                  noteId === data.id
                    ? "text-white font-semibold"
                    : "text-[#999999]"
                }
              >
                {data.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recents;
