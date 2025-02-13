import favouritesIcon from "../../assets/Favourites.svg";
import trashIcon from "../../assets/Trash.svg";
import archivedIcon from "../../assets/Archived.svg";
import { useParams } from "react-router-dom";
import { useState } from "react";

const getIcon = (name) => {
  switch (name) {
    case "Favourites":
      return favouritesIcon;
    case "Trash":
      return trashIcon;
    case "Archived":
      return archivedIcon;
    default:
      return favouritesIcon; // Fallback icon
  }
};

const frequentsInit = ["Favourites", "Trash", "Archived"];

const More = () => {
  const [frequents,setFrequents]=useState(frequentsInit)
  const {folderId,noteId}=useParams()

  return (
    <div className="flex flex-col gap-2 text-[#999999]">
      <div className="flex flex-row w-full px-5 justify-between">
        <div>More</div>
      </div>
      <div>
        {frequentsInit.map((data, index) => {
          return (
            <div
              className={`w-full p-2 px-4   flex flex-row gap-2 ${
                1 === data ? "bg-[#333333]" : "hover:bg-[#222222]"
              }`}
              key={index}
            >
              <img src={getIcon(data)} alt="" />
              <div
                className={
                  !(1 === data)
                    ? "text-[#999999]"
                    : "text-white font-semibold"
                }
              >
                {data}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default More;
