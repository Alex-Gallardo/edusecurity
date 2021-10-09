import React from "react";

// STYLES
import Styles from "./ViewUser.module.scss";

// @MATERIAL
import ToggleButton from "@mui/material/ToggleButton";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deleteFromCollection, saveInCollection } from "utils/DB";

// PROPS
interface ViewUserProps {
  user: User;
}

const ViewUser = ({ user }: ViewUserProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  // DAR DE ALTA
  const upUser = (uid: string) => () => {
    setAnchorEl(null);
    // @ts-ignore
    window.Alert({
      title: "Dar de alta (Maestro)",
      body: "El usuario tendra un rol de maestro, quieres darlo de alta?",
      type: "confirm",
      onConfirm: () => {
        saveInCollection<User>({ state: 1 }, uid, "users", true)
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
  const downUser = (uid: string) => () => {
    setAnchorEl(null);
    // @ts-ignore
    window.Alert({
      title: "Dar de baja (Estudiante)",
      body: "El usuario tendra un rol de estudiante, quieres darlo de baja?",
      type: "confirm",
      onConfirm: () => {
        saveInCollection<User>({ state: 0 }, uid, "users", true)
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
  const deleteUser = (uid: string) => () => {
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
    <div className={Styles.box_user}>
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
          <MenuItem onClick={upUser(user.uid)}>Dar de alta</MenuItem>
          <MenuItem onClick={downUser(user.uid)}>Dar de baja</MenuItem>
          <MenuItem onClick={deleteUser(user.uid)} color="red">
            Eliminar
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default ViewUser;
