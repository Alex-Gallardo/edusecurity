import React, { useState } from "react";
// STYLES
import Styles from "./usuarios.module.scss";
// COMPONENTS
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

const Usuarios = () => {
  const [state, setState] = useState<number>(0);

  // Obtener todos los usuarios

  const handleChange = (e: SelectChangeEvent) => {
    const val = e.target.value;
    setState(parseInt(val, 10));
  };

  return (
    <main className={Styles.container}>
      <section className={Styles.header}>
        <h1>Usuarios</h1>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state + ""}
          onChange={handleChange}
        >
          <MenuItem value={0}>Estudiante</MenuItem>
          <MenuItem value={1}>Maestro</MenuItem>
        </Select>
      </section>
      <section className={Styles.users}></section>
    </main>
  );
};

export default Usuarios;
