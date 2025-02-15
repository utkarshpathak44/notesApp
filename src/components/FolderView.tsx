import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNetwork } from "../CustomHooks/useNetwork";

const FolderView = () => {
  const { folderId, noteId } = useParams();

  const {
    data: folderContents,
    loading: folderLoading,
    error: folderError,
    fetchData: getFolderContents,
  } = useNetwork();

  useEffect(() => {
    const params = new URLSearchParams({
      folderId: folderId === "undefined" ? "" : folderId || "",
      archived: "false",
      favourite: "false",
      deleted: "false",
      page: "1",
      limit: "100",
    });
    getFolderContents(`/notes?${params.toString()}`, "GET", null);
  }, [folderId]);

  return (
    <div className="flex flex-col bg-[#1c1c1c] w-150 gap-8 py-15">
      <h2 className="text-2xl px-4">
        {folderLoading
          ? "Loading Folder..."
          : folderContents?.notes?.length
          ? folderContents.notes[0].folder?.name || "No Folder Name"
          : "No Notes Found"}
      </h2>
      <div className="flex flex-col gap-4 overflow-y-scroll px-4">
        {folderLoading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-3 bg-[#222222] rounded animate-pulse h-18"
              >
                <div
                  className={`h-4 bg-[#333333] animate-pulse rounded`}
                  style={{
                    width: `${
                      Math.floor(Math.random() * (150)) + 120
                    }px`,
                  }}
                ></div>
                <div className="flex flex-row gap-2">
                  <div className="h-4 bg-[#333333] animate-pulse w-10 rounded"></div>
                  <div className="h-4 bg-[#333333] animate-pulse w-20 rounded"></div>
                </div>
              </div>
            ))
          : folderContents?.notes.map((data, index) => (
              <NavLink
                key={data.id}
                to={`/folders/${data.folderId}/notes/${data.id}`}
              >
                <div
                  key={data.id}
                  className={`flex flex-col gap-2 p-2 ${
                    data.id === noteId ? "bg-[#333333]" : "bg-[#222222]"
                  }  rounded`}
                >
                  <div className="text-xl">{data.title}</div>
                  <div className="flex flex-row gap-4">
                    <div className="text-[#666666]">
                      {new Date(data.createdAt).toLocaleDateString("en-GB")}
                      {/* {data.createdAt} */}
                    </div>
                    <div className="text-[#999999]">
                      {data.preview.slice(0, 28) + " "}...
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
      </div>
    </div>
  );
};

export default FolderView;
