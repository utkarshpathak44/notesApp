import { useEffect, useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useNetwork } from "../CustomHooks/useNetwork";

const FolderView = () => {
  const { folderId, noteId } = useParams();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState([]);
  const {
    data: folderContents,
    loading: folderLoading,
    error: folderError,
    fetchData: getFolderContents,
  } = useNetwork();

  useEffect(() => {
    setPage(1);
    const params = new URLSearchParams({
      // folderId: folderId === "undefined" ? "" : folderId || "",
      archived: "false",
      favourite: "false",
      deleted: "false",
      page: "1",
      limit: "10",
      //only fetch the first page/first 10 notes when the page changes
    });

    if (location.pathname.startsWith("/folders/favorites")) {
      params.set("favourite", "true"); // Fetch favourite notes
    } else if (location.pathname.startsWith("/folders/archived")) {
      params.set("archived", "true"); // Fetch archived notes
    } else if (location.pathname.startsWith("/folders/trash")) {
      params.set("deleted", "true"); // Fetch trashed notes
    } else if (folderId) {
      params.set("folderId", folderId === "undefined" ? "" : folderId || "");
    }

    getFolderContents(`/notes?${params.toString()}`, "GET", null);

    setNotes([]); //clear so taht previoys notes are emptied
  }, [folderId]);
// }, [folderId, location.pathname]);


  // Fetch more notes when page changes
  useEffect(() => {
    if (page === 1) return;

    const params = new URLSearchParams({
      // folderId: folderId === "undefined" ? "" : folderId || "",
      archived: "false",
      favourite: "false",
      deleted: "false",
      page: page.toString(),
      limit: "10",
      //only fetch the first page/first 10 notes when the page changes
    });

    if (location.pathname.startsWith("/folders/favorites")) {
      params.set("favourite", "true"); // Fetch favourite notes
    } else if (location.pathname.startsWith("/folders/archived")) {
      params.set("archived", "true"); // Fetch archived notes
    } else if (location.pathname.startsWith("/folders/trash")) {
      params.set("deleted", "true"); // Fetch trashed notes
    } else if (folderId) {
      params.set("folderId", folderId === "undefined" ? "" : folderId || "");
    }

    getFolderContents(`/notes?${params.toString()}`, "GET", null);
  }, [page]);

  // Append new notes when folderContents updates
  useEffect(() => {
    if (folderContents?.notes?.length) {
      setNotes((prevNotes) =>
        page === 1
          ? folderContents.notes
          : [...prevNotes, ...folderContents.notes]
      );
    }
  }, [folderContents]);

  return (
    <div className="flex flex-col bg-[#1c1c1c] w-150 gap-8 py-15">
      <h2 className="text-2xl px-4">
        {folderLoading
          ? "Loading Folder..."
          : location.pathname.startsWith("/folders/favorites")
          ? "Favourite Notes"
          : location.pathname.startsWith("/folders/archived")
          ? "Archived Notes"
          : location.pathname.startsWith("/folders/trash")
          ? "Trashed notes"
          : folderContents?.notes[0]?.folder?.name
          ? folderContents.notes[0].folder.name
          : "No Data"}
      </h2>

      <div className="flex flex-col gap-4 overflow-y-scroll px-4">
        {folderLoading && page === 1
          ? Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-3 bg-[#222222] rounded animate-pulse h-18"
              >
                <div
                  className={`h-4 bg-[#333333] animate-pulse rounded`}
                  style={{
                    width: `${Math.floor(Math.random() * 150) + 120}px`,
                  }}
                ></div>
                <div className="flex flex-row gap-2">
                  <div className="h-4 bg-[#333333] animate-pulse w-10 rounded"></div>
                  <div className="h-4 bg-[#333333] animate-pulse w-20 rounded"></div>
                </div>
              </div>
            ))
          : notes.map((data) => (
              <NavLink
                key={data.id}
                to={`/folders/${data.folderId}/notes/${data.id}`}
              >
                <div
                  className={`flex flex-col gap-2 p-2 transition-all ${
                    data.id === noteId ? "bg-[#333333]" : "bg-[#222222] hover:bg-[#282828]"
                  }  rounded`}
                >
                  <div className="text-xl">{data.title}</div>
                  <div className="flex flex-row gap-4">
                    <div className="text-[#666666]">
                      {new Date(data.createdAt).toLocaleDateString("en-GB")}
                    </div>
                    <div className="text-[#999999]">
                      {data.preview.slice(0, 28) + " "}...
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}

        {/* Load More Button */}
        {page * 10 <= folderContents?.total && (
          <button
            className="p-2 bg-[#222222] text-white rounded cursor-pointer hover:bg-[#333333]"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default FolderView;
