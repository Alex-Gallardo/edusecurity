import React, { useState, useEffect } from "react";
// STYLES
import Styles from "./usuarios.module.scss";
// COMPONENTS
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface UsuariosProps {
  users: User[];
}

const Usuarios = (props: UsuariosProps) => {
  // SELECT - USER.STATE
  const [state, setState] = useState<number>(0);

  const handleChange = (e: SelectChangeEvent) => {
    const val = e.target.value;
    setState(parseInt(val, 10));
  };

  return (
    <main className={Styles.container}>
      <section className={Styles.header}>
        <h1>Usuarios</h1>
        <Select
          name='state'
          value={state + ""}
          onChange={handleChange}
        >
          <MenuItem value={0}>Estudiante</MenuItem>
          <MenuItem value={1}>Maestro</MenuItem>
        </Select>
      </section>
      <section className={Styles.users}>
        {props.users.map((user: User, index: number) => (
          <div className={Styles.user} key={`${user.name}_${user.last_name}_${index}`} >
            <img src={user.photo_url} alt={user.name} />
            <div className={Styles.cont_user_info}>
              <h3>
                {user.name} {user.last_name}
              </h3>
              <p>{user.state === 0 ? "Estudiante" : "Maestro"}</p>
            </div>

          </div>
        ))}
      </section>
    </main>
  );
};

export default Usuarios;
