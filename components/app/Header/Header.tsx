import React, { useContext } from "react";

// Styles
import Styles from "./Header.module.scss";

// CONTEXT
import UserContext from "../../../context/UserContext";

const Header = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  console.log("context-user", user);

  return (
    <nav className={Styles.container}>
      <h1>
        Edu <span>Security</span>
      </h1>
      <div className={Styles.config_perfil}>
        <img
          src={user?.photo_url || ""}
          alt={`Photo: ${user?.name}`}
        />
      </div>
    </nav>
  );
};

export default Header;
