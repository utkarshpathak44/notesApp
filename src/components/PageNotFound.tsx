import gif from "../assets/notFound.gif";
import { useNavigate } from "react-router-dom";
// import SideBar from "./SideBar";
// import jpg from "../assets/notDound2.jpg";

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row text-white bg-brand-50">
      {/* <SideBar /> */}
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-brand-50 text-white gap-2">
        <h1 className="text-4xl font-bold mt-4 animate-slideUp">Oops!</h1>
        <p className="text-lg text-brand-600 mt-2 animate-slideUp delay-100">
          This page doesn’t exist.
        </p>
        <img
          src={gif}
          alt="Page Not Found"
          className="w-80 sm:w-96 md:w-[28rem] animate-fadeIn"
        />
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded shadow-md transition-all  cursor-pointer"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};
