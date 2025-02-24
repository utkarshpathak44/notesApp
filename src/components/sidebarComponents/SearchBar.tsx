// const SearchBar = () => {

//   return (
//     <div className="flex relative flex-row w-full items-center bg-brand-200 px-2 gap-2 py-2">
//       <img src={searchIcon} alt="" />
//       <input
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         type="text"
//         placeholder="Search note"
//         className="border-none focus:ring-0 outline-none w-full"
//       />
//       <img
//         src={closeIcon}
//         alt=""
//         className="cursor-pointer"
//         onClick={() => setSearchQuery("")}
//       />
//       {!loadingSearch &&
//       (searchResponseData?.notes ?? []).length > 0 &&
//       searchQuery != "" ? (
//         <div className="absolute left-0 top-full pt-2 w-full h-200 bg-brand-100 text-white shadow-lg max-h-60 overflow-y-scroll z-10">
//           {searchResponseData?.notes.map((note: NoteInterface) => (
//             <NavLink
//               key={note.id}
//               to={`/folders/${note.folderId}/notes/${note.id}`}
//               className="block hover:bg-brand-600 p-2"
//             >
//               <div className="w-full">{note.title}</div>
//             </NavLink>
//           ))}
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default SearchBar
