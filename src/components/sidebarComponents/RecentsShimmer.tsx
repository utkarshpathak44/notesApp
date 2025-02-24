const RecentsShimmer = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div
              className="w-full p-2 h-10 px-4 flex flex-row gap-2 items-center bg-brand-100"
              key={index}
            >
              <div
                className="h-3 bg-brand-400 rounded animate-pulse"
                style={{
                  width: `${Math.floor(Math.random() * 150) + 120}px`,
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
