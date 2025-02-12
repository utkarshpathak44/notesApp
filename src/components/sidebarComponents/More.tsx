const More=({frequents,currentFrequent,setCurrentFrequent})=>{
    const setFrequent = (index) => {
        setCurrentFrequent(frequents[index]);
      };
    return(
        <div className="flex flex-col gap-2 text-[#999999]">
        <div className="flex flex-row w-full px-5 justify-between">
          <div>More</div>
          <img src="./src/assets/addFolder.svg" alt="" />
        </div>
        <div>
          {frequents.map((data, index) => {
            return (
              <div
                className={`w-full p-2 px-4   flex flex-row gap-2 ${currentFrequent === data ? "bg-[#333333]" : "hover:bg-[#222222]"}`}
                key={index}
                onClick={() => setFrequent(index)}
              >
                <img src={`./src/assets/${data}.svg`} alt="" />
                <div className="font-sans">{data}</div>
              </div>
            );
          })}
        </div>
      </div>
    )
}

export default More