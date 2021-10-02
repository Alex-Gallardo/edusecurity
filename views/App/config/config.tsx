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
  // CONTEXT
  const userCtx = useContext(UserContext);
  const { user } = userCtx;
  // ESTADO
  const [state, setState] = useState<User>(user);

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
    // @ts-ignore
    window.Alert({
      title: "Cierre de sesion",
      body: "Seguro que quieres salir de esta cuenta",
      type: "confirm",
      onConfirm: () => {
        logout().then(() => router.push("/login"));
      },
    });
  };

  // ACTUALIZAR DATOS USER
  const actDatUser = () => {
    try {
      // @ts-ignore
      window.Alert({
        title: "Actualizar datos",
        body: "Seguro que quieres actualizar tus datos?",
        type: "confirm",
        onConfirm: () => {
          saveInCollection<User>(state, state.uid, "users", true);
          router.push("/");
        },
      });
    } catch (error) {
      console.error("Error de actualizacion de datos", error);
    }
  };

  return (
    <main className={Styles.container}>
      {/* HEADER */}
      <section style={{ marginTop: "32px" }}>
        {/* PERFIL INFO */}
        <div className={Styles.perfil}>
          <img src={user?.photo_url} />
          <div className={Styles.perfil_info}>
            <h2>
              {user?.name} {user?.last_name}
            </h2>
            <p>{user?.state === 0 ? "Estudiante" : "Maestro"}</p>
          </div>
        </div>

        {/* CERRAR SESION */}
        <Button variant="contained" color="secondary" onClick={logOut}>
          Cerrar Sesion
        </Button>
      </section>

      {/* ACTUALIZA TU INFORMACION */}
      <section className={Styles.cont_data} style={{ margin: "0px" }}>
        <h2 style={{ margin: "0px" }}>Actualiza tu información</h2>
      </section>

      {/* DAT INFORMACION */}
      <section className={Styles.cont_data}>
        <TextField
          name="name"
          label="Nombre"
          variant="outlined"
          value={state?.name}
          className={Styles.input_data}
          onChange={setValue}
        ></TextField>
        <TextField
          name="last_name"
          label="Apellido"
          variant="outlined"
          value={state?.last_name}
          className={Styles.input_data}
          onChange={setValue}
        ></TextField>
      </section>

      {/* CURSOS TOMADOS */}
      <section className={Styles.info}>
        <div className={Styles.cont_info}>
          <h3>Cursos tomados</h3>
          <p>{state?.courses_taken.length || 0}</p>
        </div>
      </section>

      {/* GUARDAR INFO */}
      <section>
        <Button variant="contained" color="primary" onClick={actDatUser}>
          Guardar
        </Button>
      </section>
    </main>
  );
};

export default Config;
