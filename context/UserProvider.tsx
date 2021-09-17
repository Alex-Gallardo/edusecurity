import { useReducer } from "react";

// USERCONTEXT
import UserContext from "./UserContext";

// MODELS - TYPES
import { User } from "../Models/User";
import { AGREGAR_USUARIO, ELIMINAR_USUARIO } from "../types";

// REDUCER
import UserReducer from "./UserReducer";

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

  const agregarUsuario = (usuario: User) => {
    dispath({
      type: AGREGAR_USUARIO,
      payload: usuario,
    });
  };

  const agregarCurso = (curso: any) => {
    dispath({
      type: ELIMINAR_USUARIO,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        agregarUsuario,
        agregarCurso,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
