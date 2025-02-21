import { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNetwork } from "../customHooks/useNetwork";
import { useData } from "../contexts/DataContext";
import { NoteInterface, noteResponseData } from "../interfaces/ApiInterfaces";
const getSearchParams = ({
  folderId,
  more,
  page,
}: {
  page: number;
  more?: string;
  folderId?: string;
}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10",
  });

  if (more === "favorites") {
    params.set("favorite", "true");
  } else if (more === "archived") {
    params.set("archived", "true");
  } else if (more === "trash") {
    params.set("deleted", "true");
  } else if (folderId && folderId !== "undefined") {
    params.set("deleted", "false");
    params.set("archived", "false");
    params.set("favorite", "false");
    params.set("folderId", folderId);
  }

  return params;
};
const FolderView = () => {
  const { value } = useData();

  const { folderId, noteId, more } = useParams();
  const { currentFolder } = useData();
  const [totalNotes, setTotalNotes] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState<NoteInterface[]>([]);

  const {
    // data: folderContents,
    loading: folderLoading,
    fetchData: getFolderContents,
  } = useNetwork<noteResponseData>();

  useEffect(() => {
    // if (!folderId || folderId === "undefined") return;
    

    const fetchNotes = async () => {
      const params = getSearchParams({ page, more, folderId });
      const response = await getFolderContents(
        `/notes?${params.toString()}`,
        "GET",
        {}
      );

      if (page === 1) {
        setNotes(response?.notes || []);
      } else {
        setNotes((prev) => [...prev, ...(response?.notes || [])]);
      }

      setTotalNotes(response?.total || 0);
    };
    

    fetchNotes();
  }, [folderId, getFolderContents, more, page,value]);

  const loadFolderContents = useCallback(async () => {
    setPage((prev) => prev + 1);
    const params = getSearchParams({
      page: page + 1,
      folderId,
      more,
    });
    const response = await getFolderContents(
      `/notes?${params.toString()}`,
      "GET",
      {}
    );

    setNotes((prev) => [...prev, ...(response?.notes || [])]);
  }, [folderId, getFolderContents, more, page]);

  // useEffect(() => {
  //   setPage(1);
  //   setNotes([]);
  // }, [folderId, more]);

  const title = useMemo(() => {
    if (folderLoading) return "Loading...";
    if (more === "favorites") return "Favorite Notes";
    if (more === "archived") return "Archived Notes";
    if (more === "trash") return "Trashed Notes";
    return currentFolder || "Recent Files";
  }, [currentFolder, folderLoading, more]);

  return (
    <div className="flex flex-col bg-brand-100 w-150 gap-8 py-15">
      <h2 className="text-2xl px-4">
        {title} {totalNotes}
      </h2>

      <div className="flex flex-col gap-4 overflow-y-scroll px-4">
        {folderLoading && page === 1
          ? Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-3 bg-brand-300 rounded animate-pulse h-18"
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
          : notes.map((data: NoteInterface) => (
              <NavLink
                key={data.id}
                to={`${
                  more ? `/${more}/` : `/folders/${data.folderId}/notes/`
                }${data.id}`}
              >
                <div
                  className={`flex flex-col gap-2 p-2 transition-all ${
                    data.id === noteId
                      ? "bg-brand-500"
                      : "bg-brand-300 hover:bg-brand-400"
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

        {totalNotes > notes.length && (
          <button
            className="p-2 bg-brand-300 text-white rounded cursor-pointer hover:bg-brand-400"
            onClick={loadFolderContents}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default FolderView;
