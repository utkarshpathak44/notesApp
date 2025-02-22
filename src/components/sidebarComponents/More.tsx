import { NavLink, useParams } from "react-router-dom";
import favouritesIcon from "../../assets/favourites.svg";
import trashIcon from "../../assets/trash.svg";
import archivedIcon from "../../assets/archived.svg";

const getIcon = (name: string): string => {
  switch (name) {
    case "favorites":
      return favouritesIcon;
    case "trash":
      return trashIcon;
    case "archived":
      return archivedIcon;
    default:
      return favouritesIcon;
  }
};


const frequentsInit = ["favorites","trash","archived"];

const More = () => {
  const {more } = useParams();


  return (
    <div className="flex flex-col gap-2 text-brand-800">
      <div className="flex flex-row w-full px-5 justify-between">
        <div>More</div>
      </div>
      <div>
        {frequentsInit.map((data, index) => {

          return (
            <NavLink to={`/${data}`} key={index} className="block">
              <div
                className={`w-full p-2 px-4 flex flex-row gap-2 transition-all ${
                  more===data ? "bg-brand-400 text-white font-semibold" : "hover:bg-brand-100"
                }`}
              >
                <img src={getIcon(data)} alt={data} className="w-5 h-5" />
                <div className="capitalize">{data}</div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default More;
