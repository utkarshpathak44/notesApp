import favouritesIcon from "../../assets/Favourites.svg";
import trashIcon from "../../assets/Trash.svg";
import archivedIcon from "../../assets/Archived.svg";

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


const More=({frequents,currentFrequent,setCurrentFrequent})=>{
    const setFrequent = (index) => {
        setCurrentFrequent(frequents[index]);
      };
    return(
        <div className="flex flex-col gap-2 text-[#999999]">
        <div className="flex flex-row w-full px-5 justify-between">
          <div>More</div>
          {/* <img src="./src/assets/addFolder.svg" alt="" /> */}
        </div>
        <div>
          {frequents.map((data, index) => {
            return (
              <div
                className={`w-full p-2 px-4   flex flex-row gap-2 ${currentFrequent === data ? "bg-[#333333]" : "hover:bg-[#222222]"}`}
                key={index}
                onClick={() => setFrequent(index)}
              >
                <img src={getIcon(data)} alt="" />
                <div className={
                  !(currentFrequent === data)
                    ? "text-[#999999]"
                    : "text-white font-semibold"
                }>{data}</div>
              </div>
            );
          })}
        </div>
      </div>
    )
}

export default More