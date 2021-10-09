import React, { useState, useContext } from "react";

// CONTEXT
import UserContext from "context/UserContext";

// STYLES
import Styles from "./NewCourse.module.scss";

// @MATERIAL
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// UTILS
import { saveInCollection } from "utils/DB";

import { addToStorage, getURLFromStorage } from "utils/Storage";

// PROPS
interface NewCourseProps {
  toogle: boolean;
}

const NewCourse = (props: NewCourseProps) => {
  // STATE
  const [course, setCourse] = useState<Course>({
    _id: new Date().getTime() + "",
    cover: "",
    description: "",
    resources_id: [],
    score: 0,
    students: [],
    title: "",
    user_id: "",
  });

  // CONTEX
  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  // SETEAR VALORES
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setCourse((state) => ({ ...state, [name]: value }));
  };

  // COMPUTAR STORAGE-FIREBASE
  const computeImg = (value: any) => {
    const files = value.target.files;
    console.log("file-input", files, files[0].name);

    addToStorage("courses", files[0].name, files[0])
      .then((_res) => {
        getURLFromStorage("courses", files[0].name).then((r) => {
          console.log("Respuesta:", _res, r);
          const tmp = course;
          tmp.cover = r;
          setCourse(tmp);
          // @ts-ignore
          window.Alert({
            title: "Accion completada",
            body: `El archivo "${files[0].name}" se ha subido correctamente!`,
            type: "confirm",
          });
        });
      })
      .catch((err) => {
        // @ts-ignore
        window.Alert({
          title: "Uppss, a ocurrido un error!",
          body: "Hubo un error en la subida del archivo, intenta recargar la pagina e intentalo de nuevo",
          type: "error",
        });
        console.log("upload-image-NewCourse", err);
      });
  };

  // CREAR NUEVO CURSO
  const addNewCourse = () => {
    const tmpCourse: Course = course;
    tmpCourse.user_id = user.uid;
    console.log("tmpCourse:", tmpCourse);

    saveInCollection<Course>(course, course._id, "Courses", true).then(
      (_res) => {
        // @ts-ignore
        window.Alert({
          title: "Curso creado exitosamente",
          body: `El curso "${course.title}" se añadio a tu colección de cursos.`,
          type: "confirm",
        });
      }
    );
  };

  return (
    <div className={props.toogle ? Styles.container_o : Styles.container_c}>
      <section className={Styles.cont_form}>
        <TextField
          name="title"
          label="Nombre del curso"
          variant="filled"
          className={Styles.textfield}
          style={{ marginBottom: "18px" }}
          onChange={handleChange}
        ></TextField>
        <TextField
          name="description"
          label="Descripcion"
          variant="filled"
          className={Styles.textfield}
          onChange={handleChange}
        ></TextField>
      </section>
      <section className={Styles.update_img}>
        <label htmlFor="user_image">Upload</label>
        <input
          id="user_image"
          accept="image/*"
          type="file"
          multiple={false}
          style={{ display: "none" }}
          onChange={(e: any) => computeImg(e)}
        />
      </section>
      <section>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          onClick={addNewCourse}
        >
          Subir
        </Button>
      </section>
    </div>
  );
};

export default NewCourse;
