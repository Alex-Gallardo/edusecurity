import React, { useState } from "react";

// VIEWS
import Login from "../../views/login/login";
import Register from "../../views/register/register";

const Main = () => {
  const [state, setState] = useState(true);

  const changeToRegister = () => {
    setState(false);
  };

  return state ? <Login sendToRegister={changeToRegister} /> : <Register />;
};

export default Main;
