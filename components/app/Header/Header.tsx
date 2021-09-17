import React, { useContext } from "react";
// import { useRouter } from 'next/router'

// Styles
import Styles from "./Header.module.scss";
import { User } from "./../../../Models/User";

// CONTEXT
import UserContext from "../../../context/UserContext";

const Header = () => {
  // const router = useRouter()

  // Usar contexto de auth: para traer el objeto usuario
  const userContext: any = useContext(UserContext);
  const { user, agregarUsuario } = userContext;
  agregarUsuario({
    _id: new Date().toLocaleDateString("es"),
    photo_url:
      "https://i.pinimg.com/550x/f7/da/98/f7da9864a7c3079df7c26173520d18fc.jpg",
    name: "Gumball",
    last_name: "Watterson",
    courses_taken: [],
    state: 0,
  });
  console.log(user);

  // Si no hay usuario
  // if(!data) router.push('/login')

  return (
    <nav className={Styles.container}>
      <h1>
        Edu <span>Security</span>
      </h1>
      <div className={Styles.config_perfil}>
        {/* <img
          src={user.photo_url}
          alt={`Photo: ${user.name}_${user.last_name}`}
        /> */}
      </div>
    </nav>
  );
};

export default Header;
