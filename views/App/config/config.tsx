import React, { useContext, useState } from "react";
import UserContext from "../../../context/UserContext";

// STYLES
import Styles from "./config.module.scss";

// ROUTER
import { useRouter } from "next/router";

// @MATERIAL
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// MODELS
// import { User } from "../../../Models/User";

// UTILS
import { logout } from "utils/Auth";
import { saveInCollection } from "utils/DB";

const Config = () => {
  // ESTADO
  const [state, setState] = useState<User>();

  // CONTEXT
  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  // ROUTER
  const router = useRouter();

  // Setear valores (Input)
  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setState((state) => ({ ...state, [name]: value }));
  };

  // CERRAR SESSION
  const logOut = () => {
    logout().then(() => router.push("/login"));
  };

  // ACTUALIZAR DATOS USER
  const actDatUser = () => {

    try {
      window.Alert({
        title: 'Hola mundo',
        body: 'Mcallister',
        type: 'confirm',
        onConfirm: ()=>{
          saveInCollection<User>(user, user.uid, "users", true);
        }
      })

    } catch (error) {
      console.error(error);
    }
  };

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
        <Button variant="contained" color="error" onClick={logOut}>
          Cerrar Sesion
        </Button>
      </section>
      <section className={Styles.cont_data} style={{ margin: "0px" }}>
        <h2 style={{ margin: "0px" }}>Actualiza tu información</h2>
      </section>
      <section className={Styles.cont_data}>
        <TextField
          name="name"
          label="Nombre"
          variant="outlined"
          value={state?.name}
          onChange={setValue}
          className={Styles.input_data}
        ></TextField>
        <TextField
          name="last_name"
          label="Apellido"
          variant="outlined"
          value={state?.last_name}
          onChange={setValue}
          className={Styles.input_data}
        ></TextField>
      </section>
      <section className={Styles.info}>
        <div className={Styles.cont_info}>
          <h3>Cursos tomados</h3>
          <p>{state?.courses_taken.length || 0}</p>
        </div>
      </section>
      <section>
        <Button variant="contained" color="primary" onClick={actDatUser}>
          Guardar
        </Button>
      </section>
    </main>
  );
};

export default Config;
