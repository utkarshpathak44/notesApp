const Recents = ({ recentFiles, currentFile, setCurrentFile }) => {
    const setFile = (index) => {
      setCurrentFile(recentFiles[index]);
    };
  
    return (
      <div className="flex flex-col gap-2">
        <div className="px-5 text-[#999999]">Recents</div>
        <div>
          {recentFiles.map((data, index) => {
            return (
              <div
                className={`w-full p-2 px-4 flex flex-row gap-2 items-center ${
                  currentFile === data ? "bg-amber-800" : "hover:bg-[#222222]"
                }`}
                key={index}
                onClick={() => setFile(index)}
              >
                <img
                  src={`./src/assets/${
                    currentFile === data ? "note" : "noteDarker"
                  }.svg`}
                  alt=""
                />
                <div
                  className={
                    currentFile === data ? "text-white font-semibold" : "text-[#999999]"
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
  
  export default Recents;
  