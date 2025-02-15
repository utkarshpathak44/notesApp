import { NavLink, useLocation } from "react-router-dom";
import favouritesIcon from "../../assets/Favourites.svg";
import trashIcon from "../../assets/Trash.svg";
import archivedIcon from "../../assets/Archived.svg";
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

const frequentsInit = [
  { name: "Favourites", path: "/folders/favorites" },
  { name: "Trash", path: "/folders/trash" },
  { name: "Archived", path: "/folders/archived" },
];

const More = () => {
  const [frequents, setFrequents] = useState(frequentsInit);
  const location = useLocation(); // Get current URL path

  return (
    <div className="flex flex-col gap-2 text-[#999999]">
      <div className="flex flex-row w-full px-5 justify-between">
        <div>More</div>
      </div>
      <div>
        {frequents.map(({ name, path }, index) => {
          const isActive = location.pathname.startsWith(path); // Check if current path matches

          return (
            <NavLink to={path} key={index} className="block">
              <div
                className={`w-full p-2 px-4 flex flex-row gap-2 transition-all ${
                  isActive ? "bg-[#333333] text-white font-semibold" : "hover:bg-[#222222]"
                }`}
              >
                <img src={getIcon(name)} alt={name} className="w-5 h-5" />
                <div>{name}</div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default More;
