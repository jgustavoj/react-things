import React, { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [names, setNames] = useState<any>([{ name: "" }]);
  const [input, setInput] = useState<any>({ name: "" });

  // Editable input field
  // const [isInputActive, setIsInputActive] = useState<any>(false);
  // const enter = useKeypress('Enter');
  // const esc = useKeypress('Escape');

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
        return setNames(data);
      })
      .catch((error) => {
        console.log("Looks like there was a problem: \n", error);
      });
  }, []);

  const handlechange = (e: any) => {
    setInput({ name: e.target.value });
    // console.log("NAME", names);
  };

  const handleEditChange = (e: any) => {
    setInput({ name: e.target.value });
  };

  const handleClick = (e: any) => {
    // POST Fetch
    fetch("http://127.0.0.1:3001/api/users", {
      method: "POST",
      body: JSON.stringify(input), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => setNames(response))
      .catch((error) => console.error("Error", error));
    setInput({ name: "" });

    // WIHOUT API - USE THIS.
    // setNames([...names, input]);
    // setInput({ name: "" });
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleClick(e);
    }
  };

  const deleteName = (id: number) => {
    // Delete Fetch
    fetch(`http://127.0.0.1:3001/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (responseAsJson) {
        console.log("responseAsJson", responseAsJson);
        setNames(responseAsJson);
      })
      .catch(function (error) {
        console.log("Looks like there was a problem: \n", error);
      });
  };

  // PUT Fetch
  const handleUpdate = (id: number, value: any) => {
    fetch(`http://127.0.0.1:3001/api/users/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ name: value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (responseAsJson) {
        console.log("responseAsJson", responseAsJson);
        setNames(responseAsJson);
      })
      .catch(function (error) {
        console.log("Looks like there was a problem: \n", error);
      });
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
      {names.map((value: any, idx: number) => {
        return (
          <ul>
            <li key={idx}>
              <input
                value={value.name}
                onChange={(e) => setInput(e.target.value)}
              />

              {/* <button
                onClick={() => {
                  handleUpdate(value.id, value.name);
                }}
                style={{ marginLeft: "1rem" }}>
                Edit
              </button> */}

              <button
                style={{ marginLeft: "1rem" }}
                onClick={() => {
                  deleteName(value.id);
                }}>
                X
              </button>
            </li>
          </ul>
        );
      })}
    </>
  );
};
