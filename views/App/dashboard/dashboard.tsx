import React, { useState } from "react";

// STYLES
import Styles from "./dashboard.module.scss";

// COMPONENTS
import NewCourse from "components/app/NewCourse/NewCourse";
import Head from "next/head";

// @MATERIAL
import Fab from "@mui/material/Fab";
import Add from "@material-ui/icons/Add";
import CardCourse from "components/app/CardCourse/CardCourse";

// PROPS
interface DashboardProps {
  courses: Course[];
}

const Dashboard = ({ courses }: DashboardProps) => {
  // STATE
  const [toogle, setToogle] = useState<boolean>(false);

  // AGREGAR UN NUEVO CURSO
  const toogleNewCourse = () => setToogle(true);

  return (
    <div className={Styles.container}>
      <Head>
        <title>EduSegurity - Dashboard</title>
      </Head>
      <section className={Styles.head}>
        <h1>Crea un nuevo curso:</h1>
        <Fab
          onClick={toogleNewCourse}
          color="primary"
          variant="extended"
          className={Styles.btn_add}
        >
          <p>Añadir</p>
          <Add />
        </Fab>
      </section>
      <NewCourse toogle={toogle} />
      <h3>Tus cursos:</h3>
      <section className={Styles.courses}>
        {[...courses, ...courses].map((c: Course) => (
          <CardCourse action course={c} key={`${c._id}${c.title}`}></CardCourse>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
