import React, { useState, useEffect } from "react";

// STYLES
import Styles from "./usuarios.module.scss";

// COMPONENTS
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@material-ui/core/Select";

// UTILS
import { deleteFromCollection, saveInCollection } from "utils/DB";

// @MATERIAL
import ToggleButton from "@mui/material/ToggleButton";
import ExpandMore from "@material-ui/icons/ExpandMore";

interface UsuariosProps {
  users: User[];
}

const Usuarios = (props: UsuariosProps) => {
  // SELECT - USER.STATE
  console.log(props)
  const [state, setState] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  // FILTROS
  const handleChange = (e: any) => {
    const val = e.target.value;
    setState(parseInt(val, 10));
  };

  // DAR DE ALTA
  const upUser = (user: User)  => {
    setAnchorEl(null);
    console.log(user)
    // @ts-ignore
    window.Alert({
      title: "Dar de alta (Maestro)",
      body: "El usuario tendra un rol de maestro, quieres darlo de alta?",
      type: "confirm",
      onConfirm: () => {
        saveInCollection<User>({ state: 1 }, user.uid, "users", true)
          .then(() => {
            location.reload();
          })
          .catch((err) =>
            console.log("Ha ocurrido un error en dar de alta", err)
          );
      },
    });
  };

  // DAR DE BAJA
  const downUser = (user: User)  => {
    setAnchorEl(null);
    // @ts-ignore
    window.Alert({
      title: "Dar de baja (Estudiante)",
      body: "El usuario tendra un rol de estudiante, quieres darlo de baja?",
      type: "confirm",
      onConfirm: () => {
        saveInCollection<User>({ state: 0 }, user.uid, "users", true)
          .then(() => {
            location.reload();
          })
          .catch((err) =>
            console.log("Ha ocurrido un error en dar de baja", err)
          );
      },
    });
  };

  // ELIMINAR
  const deleteUser = (uid: string)  => {
    setAnchorEl(null);
    // @ts-ignore
    window.Alert({
      title: "Eliminar usuario",
      body: "Seguro que quieres eliminar este usuario? (No se podra recuperar)",
      type: "confirm",
      onConfirm: () => {
        deleteFromCollection(uid, "users")
          .then(() => {
            location.reload();
          })
          .catch((err) =>
            console.log("Ha ocurrido un error en eliminar usuario", err)
          );
      },
    });
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
          <div
            className={Styles.box_user}
            key={`${user.name}_${user.last_name}_${index}`}
          >
            <div className={Styles.cont_dat}>
              <img
                src={
                  user.photo_url ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt={user.name}
              />
              <div className={Styles.cont_user_info}>
                <h3>
                  {user.name} {user.last_name}
                </h3>
                <p>{user.state === 0 ? "Estudiante" : "Maestro"}</p>
              </div>
            </div>
            <div className={Styles.box_action}>
              <ToggleButton value="check" onClick={openMenu}>
                <ExpandMore />
              </ToggleButton>
              <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
                <MenuItem onClick={()=> upUser(user)}>Dar de alta</MenuItem>
                <MenuItem onClick={()=> downUser(user)}>Dar de baja</MenuItem>
                <MenuItem onClick={()=> deleteUser(user.uid)} color="red">
                  Eliminar
                </MenuItem>
              </Menu>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Usuarios;
