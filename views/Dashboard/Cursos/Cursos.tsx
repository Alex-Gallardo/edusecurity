import React, { ChangeEvent, useRef, useState } from "react";

// COMPONENTS

// @MATERIAL

// STYLES
import Styles from "./Cursos.module.scss";
import TextField from "@mui/material/TextField";
import ViewCourse from "./components/ViewCourse/ViewCourse";

// COMPONENTS

interface CursosProps {
  courses: Course[];
  resources: Resource[];
}

const Courses = ({ courses, resources }: CursosProps) => {
  // SELECT - USER.STATE
  const [state, setState] = useState<string>("");
  const [view, setView] = useState<Course[]>(courses);

  //   const coursesRef: React.MutableRefObject<Course[]> = useRef<Course[]>(courses);

  // BUSCADOR
  const changeSearchBusiness = (ev: ChangeEvent<HTMLInputElement>) => {
    // NORMALIZAR ENTRADAS
    const nfd = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // OBTENER DATOS
    const input: HTMLInputElement = ev.target as HTMLInputElement;
    let filterCourses: Course[] = [];
    const val: string = input.value;

    // FILTRAR POSTS
    filterCourses = courses.filter(
      (businessSearch: Course) => {
        if (nfd(businessSearch.title).indexOf(nfd(val)) >= 0) return true;
        return false;
      }
    );

    // ACTUALIZAR ESTADOS
    setTimeout(() => {
      setView([...filterCourses]);
    }, 200);
  };

  return (
    <main className={Styles.container}>
      <section className={Styles.header}>
        <h1>Todos los cursos</h1>
        <TextField
          variant="outlined"
          label="Buscar curso"
          onChange={changeSearchBusiness}
        ></TextField>
      </section>
      <section className={Styles.courses}>
        {view.map((c: Course, index: number) => (
          <ViewCourse
            course={c}
            resources={resources}
            key={`${c._id}_${index}`}
          />
        ))}
      </section>
    </main>
  );
};

export default Courses;
