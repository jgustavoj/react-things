import React, { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [names, setNames] = useState<any>([{ name: "" }]);
  const [input, setInput] = useState<any>({ name: "" });

  // useEffect(() => {
  //   fetch("http://127.0.0.1:3001/api/users")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw Error(response.statusText);
  //       }
  //       // Read the response as json.
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Do stuff with the JSON
  //       console.log("Success!", data);
  //       return setUserInfo(data);
  //     })
  //     .catch((error) => {
  //       console.log("Looks like there was a problem: \n", error);
  //     });
  // }, []);

  const handlechange = (e: any) => {
    setInput({ name: e.target.value });
    console.log("NAME", names);
  };

  const handleClick = () => {
    //@ts-ignore
    setNames([...names, input]);
    setInput({ name: "" });
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <>
      <div
        className="container"
        style={{
          marginTop: "10rem",
          display: "flex",
          justifyContent: "center",
        }}>
        <input
          onChange={handlechange}
          name="addName"
          placeholder="Add a name"
          value={input.name}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleClick} style={{ marginLeft: "1rem" }}>
          Add
        </button>
      </div>
      <hr />
      {names.map((name: any, idx: number) => {
        return <p key={idx}>{name.name}</p>;
      })}
    </>
  );
};
