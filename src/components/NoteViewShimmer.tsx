export const NoteViewShimmer = () => {
  return (
    <div className="flex flex-col bg-brand-50 w-full h-full p-10 py-15 ">
      <div className="w-full flex flex-row justify-between text-4xl">
        <div
          className=" h-10 bg-brand-100 animate-pulse-fast rounded"
          style={{
            width: `${Math.floor(Math.random() * 400) + 150}px`,
          }}
        ></div>
      </div>
      <div className="flex flex-col gap-2 relative pt-8 pb-8">
        <div className="flex flex-row gap-5">
          <div className="h-5 w-30 bg-brand-100 animate-pulse-fast rounded"></div>
        </div>
        <hr className="border-brand-300" />
        <div className="flex flex-row gap-5">
          <div className="h-5 w-30 bg-brand-100 animate-pulse-fast rounded"></div>
        </div>
      </div>
      {/* <div></div> */}
      <div className="w-full h-full text-l resize-none bg-brand-50 rounded mb-5 flex flex-col gap-1">
        {[...Array(Math.floor(Math.random() * 3) + 3)].map((_, index) => (
          <div key={index} className="flex flex-col gap-1">
            {[...Array(Math.floor(Math.random() * 2) + 2)].map(
              (_, subIndex) => (
                <div
                  key={subIndex}
                  className="h-5 w-full bg-brand-100 rounded animate-pulse-fast "
                ></div>
              )
            )}
            <div
              className="h-5 bg-brand-100 animate-pulse-fast rounded-md"
              style={{
                width: `${Math.floor(Math.random() * 90) + 10}%`,
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className=" h-10 w-80 bg-brand-100 animate-pulse-fast rounded-md"></div>
    </div>
  );
};
