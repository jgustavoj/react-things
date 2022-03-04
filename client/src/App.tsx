import React, { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
  const [count, setCount] = useState(0);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:3001/api/users")
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        // Read the response as json.
        return response.json();
      })
      .then((data) => {
        // Do stuff with the JSON
        console.log("Success!", data);
        return setUserInfo(JSON.stringify(data, null, 2) || "No data found");
      })
      .catch((error) => {
        console.log("Looks like there was a problem: \n", error);
      });
  }, []);

  return (
    <>
      {/* <div
        className="container"
        style={{ margin: "auto", width: "50%", marginTop: "5rem" }}>
        <div
          className="inner-container"
          style={{ margin: "auto", width: "50%" }}>
          <h1>Counter</h1>
          <button
            style={{ marginRight: "1rem" }}
            onClick={() => setCount(count - 1)}>
            Decrease
          </button>
          {count}
          <button
            style={{ marginLeft: "1rem" }}
            onClick={() => setCount(count + 1)}>
            Increase
          </button>
        </div>
      </div>
       */}

      <pre>{userInfo}</pre>
    </>
  );
};
