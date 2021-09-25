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

const Init = () => {
  // Aqui se van a manejar todos los eventos del dashboard
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Obtenemos usuarios
    getAllFromCollection<User>("users").then((res) => {
      setUsers(res);
    });
  }, []);
  console.log("usuarios:", users);

  return (
    <div className={Styles.container}>
      <HeaderDsh></HeaderDsh>
      <SideBar>
        <Usuarios users={users}></Usuarios>
      </SideBar>
    </div>
  );
};

export default Init;
