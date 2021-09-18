import React, { useContext } from "react";
import { useRouter } from "next/router";

// Styles
import Styles from "./Header.module.scss";

// CONTEXT
import UserContext from "../../../context/UserContext";
import Settings from "@material-ui/icons/Settings";

const Header = () => {
  const router = useRouter();

  const userContext = useContext(UserContext);
  const { user } = userContext;
  // console.log("context-user", user);

  const sendConfig = () => {
    router.push("/config");
  };

  const sendHome = () => {
    router.push("/");
  };
  return (
    <nav className={Styles.container}>
      <h1 onClick={sendHome}>
        Edu <span>Security</span>
      </h1>
      <div className={Styles.config_perfil}>
        <img src={user?.photo_url || ""} alt={`Photo: ${user?.name}`} />
        <Settings className={Styles.setting_icon} onClick={sendConfig} />
      </div>
    </nav>
  );
};

export default Header;
