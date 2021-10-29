import React, { useState } from "react";

// COMPONENTS

// @MATERIAL

// STYLES
import Styles from "./Cursos.module.scss";
import TextField from "@mui/material/TextField";
import ViewCourse from "./components/ViewCourse/ViewCourse";

// COMPONENTS

interface CursosProps {
  courses: Course[];
  resources: Resource[]
}

const Courses = ({ courses, resources }: CursosProps) => {
  // SELECT - USER.STATE
  const [state, setState] = useState<string>("");
  const [view, setView] = useState<number>(0);

  // FILTROS
  const handleChange = (e: any) => {
    const val = e.target.value;
    setState(val);
  };

  return (
    <main className={Styles.container}>
      <section className={Styles.header}>
        <h1>Todos los cursos</h1>
        <TextField
          variant="outlined"
          label="Buscar curso"
          onClick={handleChange}
        ></TextField>
      </section>
      <section className={Styles.users}>
        {courses.map((c: Course, index: number) => (
          <ViewCourse course={c} resources={resources} key={`${c._id}_${index}`} />
        ))}
      </section>
    </main>
  );
};

export default Courses;
