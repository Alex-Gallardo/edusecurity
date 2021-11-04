import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// STYLES
import Styles from "./Header.module.scss";

// CONTEXT
import UserContext from "../../../context/UserContext";

// @MATERIAL
import Settings from "@material-ui/icons/Settings";
import Button from "@mui/material/Button";

// CONPONENTS
import InputSearch from "../Search/Search";

const Header = () => {
  const [imgSRC, setImgSRC] = useState<string>(
    "https://www.marathonranking.com/wp-content/uploads/imgs/loading.gif"
  );

  // router
  const router = useRouter();

  const userContext = useContext(UserContext);
  const { user } = userContext;

  useEffect(() => {
    if (user) setImgSRC(user.photo_url);
  }, [user]);

  // ENVIAR A: CONFIG
  const sendConfig = () => router.push("/config");

  // ENVIAR A: INICIO
  const sendHome = () => router.push("/app");

  // ENVIAR A: FORO
  const sendForum = () => router.push("/foro");

  // BUSCAR LOS CURSOS
  const searchCourse = (txt: string) => {
    console.log("Bucando... ", txt);
  };

  return (
    <nav
      className={Styles.container}
      style={{
        backgroundColor: user && user.state === 1 ? "#A800FF" : "#07355f",
      }}
    >
      <h1 onClick={sendHome}>
        Edu <span>Security</span>
      </h1>
      <div className={Styles.config_perfil}>
        <InputSearch onSearch={searchCourse}></InputSearch>
        <Button variant="outlined" color="inherit" onClick={sendForum}>
          Foro
        </Button>
        <div className={Styles.cont_img}>
          <Image
            src={imgSRC}
            className={Styles.img}
            alt={`Photo: ${user?.name}`}
            unoptimized
            width="50px"
            height="50px"
          />
        </div>
        <Settings className={Styles.setting_icon} onClick={sendConfig} />
      </div>
    </nav>
  );
};

export default Header;
