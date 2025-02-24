import { useEffect, useState } from "react";

const AutoSaveNotifier = ({ showSaved }: { showSaved: boolean }) => {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    if (showSaved) {
      setShowing(true);
      console.log("showSaved changed");

      const timer = setTimeout(() => {
        setShowing(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [showSaved]);

  return (
    <div className="text-brand-400 font-bold text-xl">
      {showing ? "Autosaved" : ""}
    </div>
  );
};

export default AutoSaveNotifier;
