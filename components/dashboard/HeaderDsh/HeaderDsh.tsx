import React, { useContext } from "react";
import { useRouter } from "next/router";

// CONTEXT
import UserContext from "../../../context/UserContext";

// STYLES
import Styles from "./HeaderDsh.module.scss";

// ICONS
import Settings from "@material-ui/icons/Settings";

const HeaderDsh = () => {
  const router = useRouter();

  const userContext = useContext(UserContext);
  const { user } = userContext;
  // console.log("context-user", user);

  const sendConfig = () => {
    router.push("/config");
  };

  const sendHome = () => {
    router.push("/dashboard");
  };

  return (
    <nav className={Styles.container}>
      <h1 onClick={sendHome}>
        Edu <span>Security -</span> Dashboard
      </h1>
      <div className={Styles.config_perfil}>
        <Settings className={Styles.setting_icon} onClick={sendConfig} />
      </div>
    </nav>
  );
};

export default HeaderDsh;
