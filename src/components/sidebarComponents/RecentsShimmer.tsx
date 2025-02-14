const RecentsShimmer = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* <div className="px-5 text-[#999999]">Recents</div> */}
      <div>
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div
              className="w-full p-2 h-10 px-4 flex flex-row gap-2 items-center bg-[#222222]"
              key={index}
            >
              {/* <img src="./src/assets/noteDarker.svg" alt="" /> */}
              <div className="h-3 bg-[#333333] rounded animate-pulse"
              style={{
                width: `${
                  Math.floor(Math.random() * (150)) + 120
                }px`,
              }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentsShimmer;
