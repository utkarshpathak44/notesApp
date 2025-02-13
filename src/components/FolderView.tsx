import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNetwork } from "../CustomHooks/useNetwork";

const notes = [
  {
    filename: "story_intro.txt",
    utcDate: new Date().toISOString(),
    snippet: "Once upon a time in a",
  },
  {
    filename: "quick_fox.txt",
    utcDate: new Date().toISOString(),
    snippet: "The quick brown fox jumps",
  },
  {
    filename: "javascript_guide.txt",
    utcDate: new Date().toISOString(),
    snippet: "JavaScript is a versatile programming",
  },
  {
    filename: "genesis_start.txt",
    utcDate: new Date().toISOString(),
    snippet: "In the beginning, there was",
  },
  {
    filename: "mystery_novel.txt",
    utcDate: new Date().toISOString(),
    snippet: "She opened the book and",
  },
  {
    filename: "tech_evolution.txt",
    utcDate: new Date().toISOString(),
    snippet: "Technology evolves at a rapid",
  },
  {
    filename: "ocean_waves.txt",
    utcDate: new Date().toISOString(),
    snippet: "The sound of the ocean",
  },
  {
    filename: "journey_begins.txt",
    utcDate: new Date().toISOString(),
    snippet: "A journey of a thousand",
  },
  {
    filename: "sunset_glow.txt",
    utcDate: new Date().toISOString(),
    snippet: "As the sun set behind",
  },
  {
    filename: "power_responsibility.txt",
    utcDate: new Date().toISOString(),
    snippet: "With great power comes great",
  },
];

const FolderView = () => {
  const { folderId } = useParams();

  const {
    data: folderContents,
    loading: folderLoading,
    error: folderError,
    fetchData: getFolderContents,
  } = useNetwork();

  useEffect(() => {
    getFolderContents("/api/notes", "GET", {
      folderId: folderId,
      archived: false,
      favourite: false,
      page: 1,
      query: 10,
    });
  }, []);
  //no dependencies to run the component only once

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
              <NavLink to={`/folders/${data.id}`}>
                <div
                  key={data.id}
                  className={`flex flex-col gap-2 p-2 ${
                    index === 3 ? "bg-[#373737]" : "bg-[#242424]"
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
