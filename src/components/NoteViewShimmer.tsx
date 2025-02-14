export const NoteViewShimmer = () => {
  return (
    <div className="flex flex-col bg-[#181818] w-full h-full p-10 py-15 ">
      <div className="w-full flex flex-row justify-between text-4xl">
        <div
          className=" h-10 bg-[#222222] animate-pulse rounded-md"
          style={{
            width: `${Math.floor(Math.random() * 400) + 150}px`,
          }}
        ></div>
      </div>
      <div className="flex flex-col gap-2 relative pt-8 pb-8">
        <div className="flex flex-row gap-5">
          <div className="h-5 w-30 bg-[#222222] animate-pulse rounded"></div>
        </div>
        <hr className="border-[#292929]" />
        <div className="flex flex-row gap-5">
          <div className="h-5 w-30 bg-[#222222] animate-pulse rounded"></div>
        </div>
      </div>
      <div></div>
      <div className="w-full h-full text-l resize-none bg-[#181818] rounded mb-5 flex flex-col gap-1 overflow-y-scroll">
        {[...Array(Math.floor(Math.random() * 3) + 2)].map((_, index) => (
          <div key={index} className="flex flex-col gap-1">
            {/* Inner mapped divs */}
            {[...Array(Math.floor(Math.random() * 2) + 2)].map(
              (_, subIndex) => (
                <div
                  key={subIndex}
                  className="h-5 w-full bg-[#222222] rounded animate-pulse"
                ></div>
              )
            )}

            {/* Random width div */}
            <div
              className="h-5 bg-[#222222] animate-pulse rounded-md"
              style={{
                width: `${Math.floor(Math.random() * 90) + 10}%`,
              }}
            ></div>
          </div>
        ))}
      </div>

      <div className=" h-10 w-60 bg-[#333333] animate-pulse rounded-md"></div>
    </div>
  );
};
