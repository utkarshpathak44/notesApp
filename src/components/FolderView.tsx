import { Link, useParams } from "react-router-dom";

const FolderView = () => {
  const { folderName } = useParams();

  const notes = [
    { id: "note1", title: "First Note" },
    { id: "note2", title: "Second Note" },
  ];

  return (
    <div className="flex flex-col bg-stone-700 w-130">
      <h2>Folder: </h2>
      <ul>
        <ul>
          <li>this</li>
          <li>is</li>
          <li>a</li>
          <li>random</li>
        </ul>
      </ul>
    </div>
  );
};

export default FolderView;
