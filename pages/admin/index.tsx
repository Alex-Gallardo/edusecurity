import React, { useEffect, useState } from "react";

// COMPONENTS
import HeaderDsh from "../../components/dashboard/HeaderDsh/HeaderDsh";
import SideBar from "../../components/dashboard/SideBar/SideBar";

// VIEWS
import Usuarios from "./../../views/Dashboard/Usuarios/usuarios";

// STYLES
import Styles from "./index.module.scss";

// UTILS
import { getAllFromCollection } from "utils/DB";
import Verificacion from "./../../views/Dashboard/Verificacion/verificacion";

const Init = () => {
  // Aqui se van a manejar todos los eventos del dashboard
  const [view, setView] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [checks, setChecks] = useState<GComment[]>([]);

  useEffect(() => {
    // OBTNENER TODOS LOS USUARIOS
    getAllFromCollection<User>("users")
      .then((res) => setUsers(res))
      .catch((err) => console.error("get-users-index:", err));

    // OBTENERMOS TODOS LOS REQUEST-CHECK
    getAllFromCollection<GComment>("RequestCheck")
      .then((res) => setChecks(res))
      .catch((err) => console.error("get-requestcheks-index:", err));
  }, []);

  // CAMBIAR DE VISTAS
  const handleView = (n: number) => setView(n);

  return (
    <div className={Styles.container}>
      <HeaderDsh></HeaderDsh>
      <SideBar changeView={(e: number) => handleView(e)} view={view}>
        {view === 0 ? (
          <Usuarios users={users}></Usuarios>
        ) : view === 1 ? (
          ""
        ) : (
          <Verificacion requets={checks} />
        )}
      </SideBar>
    </div>
  );
};

export default Init;
