import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNetwork } from "../CustomHooks/useNetwork";

const FolderView = () => {
  const { folderId,noteId } = useParams();

  const {
    data: folderContents,
    loading: folderLoading,
    error: folderError,
    fetchData: getFolderContents,
  } = useNetwork();

  useEffect(() => {
    const params = new URLSearchParams({
      folderId: folderId || "",
      archived: "false",
      favourite: "false",
      deleted: "false",
      page: "1",
      limit: "10",
    });
    getFolderContents(`/api/notes?${params.toString()}`, "GET", null);
  }, [folderId]);

  return (
    <div className="flex flex-col bg-[#1c1c1c] w-150 gap-8 py-15">
      <h2 className="text-2xl px-4">Personal</h2>
      <div className="flex flex-col gap-4 overflow-y-scroll px-4">
        {/* Show skeleton loaders when loading */}
        {folderLoading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 p-2 bg-[#373737] rounded-md animate-pulse h-16"
              ></div>
            ))
          : folderContents.notes.map((data, index) => (
              <NavLink
                key={data.id}
                to={`/folders/${data.folderId}/notes/${data.id}`}
              >
                <div
                  key={data.id}
                  className={`flex flex-col gap-2 p-2 ${
                    data.folderId===folderId ? "bg-[#373737]" : "bg-[#242424]"
                  }  rounded-md`}
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
