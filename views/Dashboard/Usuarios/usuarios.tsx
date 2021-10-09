import React, { useState } from "react";

// STYLES
import Styles from "./usuarios.module.scss";

// @MATERIAL
import ToggleButton from "@mui/material/ToggleButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@material-ui/core/Select";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ViewUser from "components/dashboard/ViewUser/ViewUser";

// COMPONENTS

interface UsuariosProps {
  users: User[];
}

const Usuarios = (props: UsuariosProps) => {
  // SELECT - USER.STATE
  console.log(props)
  const [state, setState] = useState<number>(0);

  // FILTROS
  const handleChange = (e: any) => {
    const val = e.target.value;
    setState(parseInt(val, 10));
  };

  return (
    <main className={Styles.container}>
      <section className={Styles.header}>
        <h1>Usuarios</h1>
        <Select
          name="state"
          variant="standard"
          value={state + ""}
          onChange={handleChange}
        >
          <MenuItem value={0}>Estudiante</MenuItem>
          <MenuItem value={1}>Maestro</MenuItem>
        </Select>
      </section>
      <section className={Styles.users}>
        {props.users.map((user: User, index: number) => (
          <ViewUser user={user} key={`${user.uid}_${user.name}_${index}`} />
        ))}
      </section>
    </main>
  );
};

export default Usuarios;
