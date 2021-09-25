import React, { useState } from "react";
import Styles from "./SideBar.module.scss";

import People from "@material-ui/icons/People";
import Cancel from "@material-ui/icons/Cancel";
import VerifiedUser from "@material-ui/icons/VerifiedUser";

const Options = [
  { name: "Usuarios", icon: <People/> },
  { name: "Reportes", icon: <Cancel/> },
  { name: "Verificacion", icon: <VerifiedUser/> },
];

const SideBar = ({ children }) => {
  const [view, setView] = useState<number>(0);

  // Aqui se manejan todos las vistas del dashboard

  return (
    <div className={Styles.container}>
      <aside>
        {Options.map((op, i) => {
          return (
            <section
              className={Styles.option}
              key={op.name}
              style={{ color: view === i ? "#07355F" : "#737373" }}
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
