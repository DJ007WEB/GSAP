import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
// import StarRating from "./StarRating";
// import StarRating2 from "./StarRating2";
import App from "./App-v3";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={10} /> */}
    {/* <StarRating2 maxRating={10} /> */}
  </React.StrictMode>
);
