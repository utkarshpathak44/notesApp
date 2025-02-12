const Folders = ({allFolders,currentFolder,setCurrentFolder}) => {
    const setFolder = (index) => {
        setCurrentFolder(allFolders[index]);
      };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row w-full px-5 justify-between">
        <div className="text-[#999999]">Folders</div>
        <img src="./src/assets/addFolder.svg" alt="" />
      </div>
      <div>
        {allFolders.map((data, index) => {
          return (
            <div
              className={`w-full p-2 px-4 flex flex-row gap-2 ${
                currentFolder === data ? "bg-[#333333]" : "hover:bg-[#222222]"
              }`}
              key={index}
              onClick={() => setFolder(index)}
            >
              <img
                src={`./src/assets/${
                  currentFolder === data ? "currentFolder" : "otherFolder"
                }.svg`}
                alt=""
              />
              <div
                className={
                  !(currentFolder === data)
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

export default Folders;
