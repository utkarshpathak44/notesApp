import { useState } from "react";
import restoreHuge from "../assets/restoreHuge.svg";

const Restore = ({ RestoreNote }: { RestoreNote: () => void }) => {
  const [name] = useState<string>("File");
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 bg-brand-50">
      <img src={restoreHuge} alt="" className="w-20" />
      <h2 className="text-2xl font-semibold">Restore File"</h2>
      <p className="text-brand-700 w-125 text-center">
        Dont't want to lose this note? It's not too late! Just click the
        'Restore' button and it will be added back to the list. Its that Simple
      </p>
      <button
        className=" px-8 py-2 text-xl text-white bg-amber-800 rounded xl cursor-pointer hover:bg-amber-700 transition-all"
        onClick={RestoreNote}
      >
        Restore {name}
      </button>
    </div>
  );
};

export default Restore;
