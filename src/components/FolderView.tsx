// import { Link, useParams } from "react-router-dom";

const FolderView = () => {
  // const { folderName } = useParams();

  const notes = [
    {
      filename: "file_1.txt",
      utcDate: new Date().toISOString(),
      snippet: "Once upon a time in a",
    },
    {
      filename: "file_2.txt",
      utcDate: new Date().toISOString(),
      snippet: "The quick brown fox jumps",
    },
    {
      filename: "file_3.txt",
      utcDate: new Date().toISOString(),
      snippet: "JavaScript is a versatile programming",
    },
    {
      filename: "file_4.txt",
      utcDate: new Date().toISOString(),
      snippet: "In the beginning, there was",
    },
    {
      filename: "file_5.txt",
      utcDate: new Date().toISOString(),
      snippet: "She opened the book and",
    },
    {
      filename: "file_6.txt",
      utcDate: new Date().toISOString(),
      snippet: "Technology evolves at a rapid",
    },
    {
      filename: "file_7.txt",
      utcDate: new Date().toISOString(),
      snippet: "The sound of the ocean",
    },
    {
      filename: "file_8.txt",
      utcDate: new Date().toISOString(),
      snippet: "A journey of a thousand",
    },
    {
      filename: "file_9.txt",
      utcDate: new Date().toISOString(),
      snippet: "As the sun set behind",
    },
    {
      filename: "file_10.txt",
      utcDate: new Date().toISOString(),
      snippet: "With great power comes great",
    },
  ];

  return (
    <div className="flex flex-col bg-[#1c1c1c] w-150 gap-8 p-4 py-15">
      <h2 className="text-2xl">Personal </h2>
      <div className="flex flex-col gap-4">
        {notes.map((data, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col gap-2 p-2 ${
                index === 3 ? "bg-[#373737]" : "bg-[#242424]"
              }  rounded-md`}
            >
              <div className="text-xl">{data.filename}</div>
              <div className="flex flex-row gap-4">
                <div className="text-[#666666]">
                  {new Date(data.utcDate).toLocaleDateString("en-GB")}
                </div>
                <div className="text-[#999999]">{data.snippet.slice(0,28) + " "}...</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FolderView;
