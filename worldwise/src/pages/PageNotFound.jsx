// NotFound.js
import React from "react";
import PageNav from "../components/PageNav";

const NotFound = () => {
  return (
    <>
      <PageNav />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f7f7f7",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: "100px",
            fontWeight: "bold",
            color: "#ff4040",
          }}
        >
          404
        </div>

        <div
          style={{
            fontSize: "20px",
            padding: "10px",
            color: "#555",
            textAlign: "center",
          }}
        >
          Not Found
        </div>
      </div>
    </>
  );
};

export default NotFound;
