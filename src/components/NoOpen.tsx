import noteHuge from "../assets/noteHuge.svg";

const NoOpen = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <img src={noteHuge} alt="" className="w-20" />
      <h2 className="text-2xl font-semibold">Select a note to view</h2>
      <p className="text-[#666666] w-125 text-center">
        Choose a note from the list on the left to view its contents, or create
        a new note to add to your collection.
      </p>
    </div>
  );
};

export default NoOpen;
