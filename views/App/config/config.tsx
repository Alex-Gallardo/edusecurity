import React, { useContext, useState } from "react";
import UserContext from "../../../context/UserContext";
// STYLES
import Styles from "./config.module.scss";
// @material
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// MODELS
import { User } from "../../../Models/User";

const Config = () => {
  const [state, setState] = useState<User>();

  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  // Setear valores (Input)
  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setState((state) => ({ ...state, [name]: value }));
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
        <Button variant="contained" color="primary">
          Guardar
        </Button>
      </section>
      <section className={Styles.cont_data} style={{margin: '0px'}}>
        <h3 style={{margin: '0px'}}>Actualiza tu información</h3>
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
        <div className={Styles.cont_info}>
          <h3>Cursos tomados</h3>
          <p>{state?.courses_taken.length || 0}</p>
        </div>
      </section>
    </main>
  );
};

export default Config;
