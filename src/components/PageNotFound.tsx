import gif from "../assets/notFound.gif";

export const PageNotFound = () => {
  return (
    <div className="w-screen h-screen text-3xl flex flex-col items-center justify-center text-white bg-stone-900 gap-2">
      <div className="">This page dosent exist</div>
      <img src={gif} alt="" />
    </div>
  );
};
