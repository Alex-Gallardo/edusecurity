import React from "react";

// STYLES
import Styles from "./Graficas.module.scss";

import { Bar, Pie } from "react-chartjs-2";

// PROPS
interface GraficasProps {
  users: User[];
  courses: Course[];
}

const Graficas = ({ users, courses }: GraficasProps) => {
  const dataUsers = {
    labels: ["Estudiantes", "Maestros"],
    datasets: [
      {
        label: "Usuarios",
        data: [
          users.filter((u: User) => u.state === 0).length,
          users.filter((u: User) => u.state === 1).length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          //   "rgba(255, 206, 86, 0.2)",
          //   "rgba(75, 192, 192, 0.2)",
          //   "rgba(153, 102, 255, 0.2)",
          //   "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          //   "rgba(255, 206, 86, 1)",
          //   "rgba(75, 192, 192, 1)",
          //   "rgba(153, 102, 255, 1)",
          //   "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataCourses = {
    labels: ["Menos de 10 estudiantes", "Mas de 10 estudiantes"],
    datasets: [
      {
        label: "Cursos",
        data: [
          courses.filter((c: Course) => c.students.length <= 5).length,
          courses.filter((c: Course) => c.students.length >= 5).length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          //   "rgba(255, 206, 86, 0.2)",
          //   "rgba(75, 192, 192, 0.2)",
          //   "rgba(153, 102, 255, 0.2)",
          //   "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          //   "rgba(255, 206, 86, 1)",
          //   "rgba(75, 192, 192, 1)",
          //   "rgba(153, 102, 255, 1)",
          //   "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <main className={Styles.container}>
      <section className={Styles.header}>
        <h1>Datos generales:</h1>
      </section>
      <section className={Styles.graphcs}>
        {/* USUARIOS */}
        <div className={Styles.cont_gph}>
          <h2>Usuarios</h2>
          <Bar
            data={dataUsers}
            // height={200}
            // width={250}
            className={Styles.graph}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              //   resizeDelay: 10000000,
            }}
          />
        </div>
        {/* CURSOS */}
        <div className={Styles.cont_gph}>
          <h2>Cursos</h2>
          <Pie
            data={dataCourses}
            className={Styles.graph}
            options={{
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default Graficas;
