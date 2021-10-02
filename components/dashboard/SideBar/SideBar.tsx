import React, { useState } from "react";
import Styles from "./SideBar.module.scss";

import People from "@material-ui/icons/People";
import Cancel from "@material-ui/icons/Cancel";
import VerifiedUser from "@material-ui/icons/VerifiedUser";

const Options = [
  { name: "Usuarios", icon: <People /> },
  { name: "Reportes", icon: <Cancel /> },
  { name: "Verificacion", icon: <VerifiedUser /> },
];

// PROPS
interface SideBarProps {
  view: number;
  changeView: any;
  children: any;
}

const SideBar = ({ changeView, children, view }: SideBarProps) => {
  // Aqui se manejan todos las vistas del dashboard
  const setViewProps = (index: number) => () => {
    changeView(index);
  };

  return (
    <div className={Styles.container}>
      <aside>
        {Options.map((op, i) => {
          return (
            <section
              className={Styles.option}
              key={op.name}
              style={{ color: view === i ? "#07355F" : "#737373" }}
              onClick={setViewProps(i)}
            >
              {op.icon}
              <h3>{op.name}</h3>
            </section>
          );
        })}
      </aside>
      <div className={Styles.cont_chd}>{children}</div>
    </div>
  );
};

export default SideBar;
