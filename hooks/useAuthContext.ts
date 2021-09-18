import React, { useEffect, useContext } from "react";

// Usuario temporal
const tmpUser = {
  _id: new Date().toLocaleDateString("es"),
  photo_url:
    "https://i.pinimg.com/550x/f7/da/98/f7da9864a7c3079df7c26173520d18fc.jpg",
  name: "Gumball",
  last_name: "Watterson",
  courses_taken: [],
  state: 0,
};

// CONTEXT
import UserContext from "../context/UserContext";

const useAuthContext = ({ name, photoURL }) => {
  console.log("entro!", name, photoURL);
  const userCtx = useContext(UserContext);
  const { setUser } = userCtx;
  tmpUser.name = name;
  tmpUser.photo_url = photoURL;
  setUser(tmpUser);
};

export default useAuthContext;
