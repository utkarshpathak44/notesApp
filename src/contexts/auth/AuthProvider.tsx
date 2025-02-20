// import {
//   createContext,
//   useEffect,
//   useContext,
//   useState,
//   useLayoutEffect,
// } from "react";

// const AuthContext = createContext(undefined);

// export const useAuth = () => {
//   const authContext = useContext(AuthContext);
//   if (!authContext) {
//     throw new Error("useAuth must be used within an authPorvider");
//   }
//   return authContext;
// };

// const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     //fetch the access token from here
//     const fetchMe = async () => {};
//     fetchMe();
//   }, []);

//   useLayoutEffect(() => {
//     //create an interceptor for the api here, whenever any request is made, inject the token into it
//     //using the useLayoutEffect hook to block all the rendering
//     //we can check for the expiration of the token right here
//   }, [token]);

//   useLayoutEffect(() => {
//     //updating the token if the token is null/ expired
//   });

//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
