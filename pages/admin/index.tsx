import React, { useEffect, useState } from "react";

// UTILS
import { getAllFromCollection } from "utils/DB";

// COMPONENTS
import HeaderDsh from "../../components/dashboard/HeaderDsh/HeaderDsh";
import SideBar from "../../components/dashboard/SideBar/SideBar";

// VIEWS
import Usuarios from "views/Dashboard/Usuarios/usuarios";
import Verificacion from "views/Dashboard/Verificacion/verificacion";
import Reportes from "views/Dashboard/Reportes/reportes";
import Cursos from "views/Dashboard/Cursos/Cursos";
import Graficas from "views/Dashboard/Graficas/Graficas";

// STYLES
import Styles from "./index.module.scss";

const Init = () => {
  // Aqui se van a manejar todos los eventos del dashboard
  const [view, setView] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [checks, setChecks] = useState<GComment[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [resources, setResourses] = useState<Resource[]>([]);

  useEffect(() => {
    // OBTNENER TODOS LOS USUARIOS
    getAllFromCollection<User>("users")
      .then((res) => setUsers(res))
      .catch((err) => console.error("get-users-index:", err));

    // OBTENEMOS TODOS LOS REQUEST-CHECK
    getAllFromCollection<GComment>("RequestCheck")
      .then((res) => setChecks(res))
      .catch((err) => console.error("get-requestcheks-admin/index:", err));

    // OBTENEMOS TODOS LOS REPORTES
    getAllFromCollection<Report>("Reports")
      .then((res) => setReports(res))
      .catch((err) => console.error("get-requestreports-admin/index:", err));

    // OBTENEMOS TODOS LOS CURSOS
    getAllFromCollection<Course>("Courses")
      .then((res) => setCourses(res))
      .catch((err) => console.error("get-requestCourses-admin/index:", err));

    // OBTENEMOS TODOS LOS RECURSOS
    getAllFromCollection<Resource>("Resources")
      .then((res) => setResourses(res))
      .catch((err) => console.error("get-requestResources-admin/index:", err));
  }, []);

  // CAMBIAR DE VISTAS
  const handleView = (n: number) => setView(n);

  return (
    <div className={Styles.container}>
      <HeaderDsh></HeaderDsh>
      <SideBar changeView={(e: number) => handleView(e)} view={view}>
        {view === 0 ? (
          <Usuarios users={users} courses={courses}></Usuarios>
        ) : view === 1 ? (
          <Cursos courses={courses} resources={resources} />
        ) : view === 2 ? (
          <Reportes
            reports={reports.filter((r: Report) => r.state === false)}
          />
        ) : view === 3 ? (
          <Verificacion requets={checks} />
        ) : (
          <Graficas users={users} courses={courses} />
        )}
      </SideBar>
    </div>
  );
};

export default Init;
