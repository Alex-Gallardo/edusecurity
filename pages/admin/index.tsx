import React from "react";

// COMPONENTS
import HeaderDsh from "../../components/dashboard/HeaderDsh/HeaderDsh";
import SideBar from "../../components/dashboard/SideBar/SideBar";
// VIEWS
import Usuarios from "./../../views/Dashboard/Usuarios/usuarios";
// STYLES
import Styles from "./index.module.scss";

const Init = () => {
  // Aqui se van a manejar todos los eventos del dashboard
  return (
    <div className={Styles.container}>
      <HeaderDsh></HeaderDsh>
      <SideBar>
        <Usuarios></Usuarios>
      </SideBar>
    </div>
  );
};

export default Init;
