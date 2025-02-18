import { useEffect, useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useNetwork } from "../CustomHooks/useNetwork";
import { useData } from "../contexts/DataContext";

const FolderView = () => {
  const { folderId, noteId, more } = useParams();
  // const location = useLocation();
  const { value,currentFolder } = useData();

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
      archived: "",
      favorite: "",
      deleted: "",
      page: "1",
      limit: "10",
      //only fetch the first page/first 10 notes when the page changes
    });

    if (more === "favorites") {
      params.set("favorite", "true");
    } else if (more === "archived") {
      params.set("archived", "true");
    } else if (more === "trash") {
      params.set("deleted", "true");
    } else if (folderId) {
      params.set("folderId", folderId || "");
    }
    if (folderId == "undefined") return;

    getFolderContents(`/notes?${params.toString()}`, "GET", null);

    setNotes([]); //clear so taht previoys notes are emptied
  }, [folderId, more,value]);
  // }, [folderId, location.pathname]);

  // Fetch more notes when page changes
  useEffect(() => {
    if (page === 1) return;

    const params = new URLSearchParams({
      // folderId: folderId === "undefined" ? "" : folderId || "",
      archived: "false",
      favorite: "false",
      deleted: "false",
      page: page.toString(),
      limit: "10",
      //only fetch the first page/first 10 notes when the page changes
    });

    if (more === "favorites") {
      params.set("favorite", "true");
    } else if (more === "archived") {
      params.set("archived", "true");
    } else if (more === "trash") {
      params.set("deleted", "true");
    } else if (folderId) {
      params.set("folderId", folderId || "");
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
    <div className="flex flex-col bg-brand-100 w-150 gap-8 py-15">
      <h2 className="text-2xl px-4">
        {folderLoading
          ? "Loading..."
          : more === "favorites"
          ? "Favorite Notes"
          : more === "archived"
          ? "Archived Notes"
          : more === "trash"
          ? "Trashed Notes"
          : currentFolder|| "No Data"}
      </h2>

      <div className="flex flex-col gap-4 overflow-y-scroll px-4">
        {folderLoading && page === 1
          ? Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-3 bg-brand-100 rounded animate-pulse h-18"
              >
                <div
                  className={`h-4 bg-brand-400 animate-pulse rounded`}
                  style={{
                    width: `${Math.floor(Math.random() * 150) + 120}px`,
                  }}
                ></div>
                <div className="flex flex-row gap-2">
                  <div className="h-4 bg-brand-400 animate-pulse w-10 rounded"></div>
                  <div className="h-4 bg-brand-400 animate-pulse w-20 rounded"></div>
                </div>
              </div>
            ))
          : notes.map((data) => (
              <NavLink
                key={data.id}
                to={`${
                  more ? `/${more}/` : `/folders/${data.folderId}/notes/`
                }${data.id}`}
              >
                <div
                  className={`flex flex-col gap-2 p-2 transition-all ${
                    data.id === noteId
                      ? "bg-brand-400"
                      : "bg-brand-100 hover:bg-brand-300"
                  }  rounded`}
                >
                  <div className="text-xl">{data.title}</div>
                  <div className="flex flex-row gap-4">
                    <div className="text-brand-700">
                      {new Date(data.createdAt).toLocaleDateString("en-GB")}
                    </div>
                    <div className="text-brand-800">
                      {data.preview.slice(0, 28) + " "}...
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}

        {/* Load More Button */}
        {page * 10 <= folderContents?.total && (
          <button
            className="p-2 bg-brand-100 text-white rounded cursor-pointer hover:bg-brand-400"
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
