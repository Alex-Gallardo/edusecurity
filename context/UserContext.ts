import { Context, createContext } from "react";

// KEYS
interface ContextProps {
  user: User;
  setUser: (user: User) => unknown;
  deleteUser: (id: string) => unknown;
}

// VALORES POR DEFECTO
const DefContext: ContextProps = {
  user: {
    uid: "",
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
