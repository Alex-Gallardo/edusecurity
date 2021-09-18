import { Context, createContext } from "react";
import { User } from "../Models/User";

// KEYS
interface ContextProps {
  user: User;
  setUser: (user: User) => unknown;
  deleteUser: (user: User) => unknown;
}

// VALOR POR DEFECTO
const DefContext: ContextProps = {
  user: {
    _id: "",
    photo_url: "",
    name: "",
    last_name: "",
    courses_taken: [],
    state: 0,
  },
  setUser: () => {},
  deleteUser: () => {},
};

// CONTEXTO
const UserContext: Context<ContextProps> = createContext(DefContext);

export default UserContext;
