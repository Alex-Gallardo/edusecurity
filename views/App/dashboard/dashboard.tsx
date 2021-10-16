import React, { useState } from "react";
import Router from "next/router";

// STYLES
import Styles from "./dashboard.module.scss";

// COMPONENTS
import NewCourse from "components/app/NewCourse/NewCourse";
import Head from "next/head";

// @MATERIAL
import Fab from "@mui/material/Fab";
import Add from "@material-ui/icons/Add";

// PROPS
interface DashboardProps {
  courses: Course[];
}

const Dashboard = ({ courses }: DashboardProps) => {
  // STATE
  const [toogle, setToogle] = useState<boolean>(false);

  // AGREGAR UN NUEVO CURSO
  const toogleNewCourse = () => setToogle(true);

  // ENVIAR A WATCH
  const watchResource = (cid) => () => {
    Router.replace({ pathname: "/dashboard/[cid]", query: { cid } });
  };

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
        {courses.map((c: Course, i: number) => {
          return (
            <div
              className={Styles.cc2}
              key={`cc2_${c.title}_${c._id}`}
              onClick={watchResource(c._id)}
            >
              <img src={c.cover}></img>
              <h4>{c.title}</h4>
              <p>{c.description}</p>
              {/* <p>{c.score}</p> */}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Dashboard;
