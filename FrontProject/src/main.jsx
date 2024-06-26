import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { AppRouter, UserProvider } from './Router/Router';

const helmetContext = {};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </HelmetProvider>
  </React.StrictMode>
);







// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import { RouterProvider } from "react-router-dom";
// import Router from "./Router/Router.jsx";
// import { HelmetProvider } from "react-helmet-async";

// const helmetContext = {};
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <HelmetProvider context={helmetContext}>
//       <RouterProvider router={Router} />
//     </HelmetProvider>
//   </React.StrictMode>
// );
