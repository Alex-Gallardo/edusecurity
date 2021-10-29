import React, { useState } from "react";

// COMPONENTS
import ViewUser from "components/dashboard/ViewUser/ViewUser";

// @MATERIAL
import ToggleButton from "@mui/material/ToggleButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@material-ui/core/Select";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Button from "@mui/material/Button";
import TableDat from "components/app/TableDat/Tabledat";

// STYLES
import Styles from "./usuarios.module.scss";

// COMPONENTS

interface UsuariosProps {
  users: User[];
  courses: Course[];
}

const Usuarios = (props: UsuariosProps) => {
  // SELECT - USER.STATE
  const [state, setState] = useState<number>(0);
  const [view, setView] = useState<number>(0);
  const [userFocus, setUserFocus] = useState<User | null>(null);

  // FILTROS
  const handleChange = (e: any) => {
    const val = e.target.value;
    setState(parseInt(val, 10));
  };

  const handleChangeView = (uid: string) => {
    const findUser = props.users.find((u) => u.uid === uid);
    if (findUser) {
      setUserFocus(findUser);
      setView(1);
    }
  };

  return view === 0 ? (
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
          <ViewUser
            user={user}
            onChange={handleChangeView}
            key={`${user.uid}_${user.name}_${index}`}
          />
        ))}
      </section>
    </main>
  ) : (
    <main className={Styles.container}>
      {/* HEADER */}
      <section className={Styles.header}>
        <div className={Styles.header_info}>
          <img src={userFocus?.photo_url} alt="profile img" />
          <div className={Styles.info_}>
            <h1>{userFocus?.name + userFocus?.last_name}</h1>
            <div className={Styles.info_dat}>
              <p className={Styles.state}>
                {userFocus?.state === 0 ? "Estudiante" : "Maestro"}
              </p>
              <StarBorder style={{marginRight: '8px'}}/>
              <p>{userFocus?.score || 0}</p>
            </div>
          </div>
        </div>
        <Button variant="contained" onClick={() => setView(0)}>
          Regresar
        </Button>
      </section>

      {/* INFORMACION DEL USUARIO */}
      <section className={Styles.info_user}>
        <h2>Informacion:</h2>
        <div className={Styles.user_dat}>
          <h3>Cursos tomados: </h3>
          <p>{userFocus.courses_taken.length}</p>
        </div>
        <div className={Styles.user_dat}>
          <h3>Cursos dados: </h3>
          <p>{userFocus.courses_id?userFocus.courses_id.length: 'Ningun curso dado' }</p>
        </div>
      </section>
      {/* BODY-INFO */}
      <section className={Styles.body}>
        <section className={Styles.course}>
          <h2 style={{ margin: "0px" }}>Cursos:</h2>

        </section>
      </section>
    </main>
  );
};

export default Usuarios;
