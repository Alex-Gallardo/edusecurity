import React, { useState } from "react";
import Head from "next/head";

// STYLES
import Styles from "./dash2.module.scss";

// COMPONENTS

// @MATERIAL

// PROPS
interface DashboardProps {
  course: Course;
}

const DashboardView2 = ({ course }: DashboardProps) => {
  // STATE

  return (
    <div className={Styles.container}>
      <Head>
        <title>EduSegurity - Dashboard</title>
      </Head>
      <section className={Styles.info}>
        <section className={Styles.info_dat}>
          <h2>Informacion:</h2>
          <div className={Styles.info_dat_info}>
            <img src={course.cover} alt={course.title} />
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <div className={Styles.dat_info_grid}>
              <h3>Estudiantes</h3>
              <p>{course.students.length}</p>
              <h3>Calificacion</h3>
              <p>{course.score}</p>
            </div>
          </div>
        </section>
        <section className={Styles.info_dat}>
          <h2>Publica un nuevo video</h2>
        </section>
      </section>
      <section className={Styles.courses}></section>
    </div>
  );
};

export default DashboardView2;
