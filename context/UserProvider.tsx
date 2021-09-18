import { useEffect, useReducer } from "react";

// USERCONTEXT
import UserContext from "./UserContext";

// MODELS - TYPES
import { User } from "../Models/User";
import { AGREGAR_USUARIO, ELIMINAR_USUARIO } from "../types";

// REDUCER
import UserReducer from "./UserReducer";
import { userListener } from "../utils/Auth";

const UserProvider = ({ children }) => {
  // STATE - USUARIOS
  const initialState: User = {
    _id: new Date().toLocaleDateString("es"),
    photo_url:
      "https://i.pinimg.com/550x/f7/da/98/f7da9864a7c3079df7c26173520d18fc.jpg",
    name: "Gumball",
    last_name: "Watterson",
    courses_taken: [],
    state: 0,
  };

  const [state, dispath] = useReducer(UserReducer, initialState);

  const setUser = (usuario: User) => {
    dispath({
      type: AGREGAR_USUARIO,
      payload: usuario,
    });
  };

  const deleteUser = (curso: any) => {
    dispath({
      type: ELIMINAR_USUARIO,
    });
  };

  useEffect(() => {
    let listener;
    const u: User = initialState;

    // **Transforma una funcion asincrona a sincrona
    (async () =>
      (listener = await userListener((user) => {
        if (user) {
          u.name = user.displayName;
          u.last_name = "";
          u.photo_url = user.photoURL;
          setUser(u);
        } else {
          setUser(u);
        }
      })))();

    return () => {
      listener();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        setUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
