import { useEffect, useReducer } from "react";

// USERCONTEXT
import UserContext from "./UserContext";

// MODELS - TYPES
import { AGREGAR_USUARIO, ELIMINAR_USUARIO } from "../types";

// REDUCER
import UserReducer from "./UserReducer";
import { userListener } from "../utils/Auth";
import { getFromCollection } from "./../utils/DB";

const UserProvider = ({ children }) => {
  // STATE - USUARIOS
  const initialState: User = {
    uid: new Date().getTime() + "",
    photo_url:
      "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
    name: "No User",
    last_name: "NULL",
    courses_taken: [],
    state: 0,
  };

  const [state, dispath] = useReducer(UserReducer, initialState);

  // Setear usuario en el context
  const setUser = (usuario: User) => {
    dispath({
      type: AGREGAR_USUARIO,
      payload: usuario,
    });
  };

  // Eliminar usuario en el context
  const deleteUser = (id: string) => {
    dispath({
      type: ELIMINAR_USUARIO,
      payload: id,
    });
  };

  useEffect(() => {
    let listener: any;
    const u: User = initialState;

    // **Transforma una funcion asincrona a sincrona
    (async () =>
      (listener = await userListener((user) => {

        // console.log('Disponibilidad de usuario: ', user)
        
        if (user) {
          getFromCollection<User>(user.uid, "users")
            .then((res: User) => {
              setUser(res)})
            .catch((err) => {
              console.error("getUser-UserProvider", err);
              setUser(u);
            });
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
