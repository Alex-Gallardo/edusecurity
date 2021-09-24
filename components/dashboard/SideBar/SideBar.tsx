import Styles from "./SideBar.module.scss";

const Options = [
  { name: "Usuarios" },
  { name: "Reportes" },
  { name: "Verificacion" },
];

const SideBar = ({ children }) => {
  // Aqui se manejan todos las vistas del dashboard

  return (
    <div className={Styles.container}>
      <aside>
        {Options.map((op) => {
          return (
            <section className={Styles.option} key={op.name}>
              <h2>{op.name}</h2>
            </section>
          );
        })}
      </aside>
      <div className={Styles.cont_chd}>{children}</div>
    </div>
  );
};

export default SideBar;
