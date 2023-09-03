import React from "react";
import "./loader.css";

const Loader = ({ msg }) => {
  return (
    <div className="loader">
      <p>{msg}</p>
    </div>
  );
};

export default Loader;
