import React, { useContext } from "react";

// CONTEXT
import UserContext from "../context/UserContext";

// Usuario temporal
const tmpUser: User = {
  uid: new Date().toLocaleDateString("es"),
  photo_url:
    "https://i.pinimg.com/550x/f7/da/98/f7da9864a7c3079df7c26173520d18fc.jpg",
  name: "Gumball",
  last_name: "Watterson",
  courses_taken: [],
  state: 0,
};

// PROPS
interface AuthProps {
  name?: string;
  photoURL?: string;
}

const useAuthContext = (props?: AuthProps) => {
  console.log("login!", props.name, props.photoURL);

  const userCtx = useContext(UserContext);
  const { setUser } = userCtx;

  tmpUser.name = props.name || tmpUser.name;
  tmpUser.photo_url = props.photoURL || tmpUser.photo_url;

  setUser(tmpUser);
};

export default useAuthContext;
