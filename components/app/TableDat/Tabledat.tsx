import React from "react";

// STYLES
import Styles from "./Tabledat.module.scss";

// PROPS
interface TableDatProps {
  course: Course;
}

const TableDat = ({ course }: TableDatProps) => {
  return (
    <div className={Styles.container}>
      <section className={Styles.header}>
        <h3>Estudiantes</h3>
        <h3>Calificación</h3>
        <h3>Comentarios</h3>
      </section>
      <section className={Styles.dat}>
        <div>
          <h1>{course.students.length}</h1>
        </div>
        <div>
          <h1>{course.score}</h1>
        </div>
        <div>
          <h1>0</h1>
        </div>
      </section>
    </div>
  );
};

export default TableDat;
