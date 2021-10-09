import { Context, createContext } from "react";

// KEYS
interface ContextUserProps {
  user: User;
  setUser: (user: User) => unknown;
  deleteUser: (id: string) => unknown;
}

// VALORES POR DEFECTO
const DefContext: ContextUserProps = {
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
const UserContext: Context<ContextUserProps> = createContext(DefContext);

export default UserContext;
