import { useEffect, useState } from "react";

const AutoSaveNotifier = ({ showSaved }) => {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
      const timer = setTimeout(() => {
        setShowing(false);
      }, 1000);
      return () => clearTimeout(timer);
  }, [showing]);

  useEffect(() => {
    console.log("showSaved changed")
    setShowing(true);
  }, [showSaved]);

  return <div className="text-[#333333] font-bold text-xl">{showing ? "Autosaved" : ""}</div>;
};

export default AutoSaveNotifier;
