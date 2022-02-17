import React from "react";

const Error = ({ error }) => {
  return (
    <div
      style={{
        fontSize: "14px",
        color: "red",
        marginLeft: "10px",
        marginBottom: "10px",
      }}
    >
      {error}
    </div>
  );
};

export default Error;
