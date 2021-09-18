import { Button } from "@material-ui/core";
import React from "react";
import react, { useContext } from "react";
import UserContext from "./../../context/UserContext";
import Styles from "./config.module.scss";

const Config = () => {
  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  return (
    <main className={Styles.container}>
      <section style={{ marginTop: "32px" }}>
        <div className={Styles.perfil}>
          <img src={user?.photo_url} />
          <div className={Styles.perfil_info}>
            <h2>
              {user?.name} {user?.last_name}
            </h2>
            <p>{user?.state === 0 ? "Estudiante" : "Maestro"}</p>
          </div>
        </div>
        <Button variant="contained" color="secondary" >Guardar</Button>
      </section>
      <section></section>
      <section></section>
    </main>
  );
};

export default Config;
