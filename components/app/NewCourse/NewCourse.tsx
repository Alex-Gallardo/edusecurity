import React, { useState, useContext } from "react";

// CONTEXT
import UserContext from "context/UserContext";

// STYLES
import Styles from "./NewCourse.module.scss";

// @MATERIAL
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// UTILS
import { saveInCollection } from "utils/DB";

import { addToStorage, getURLFromStorage } from "utils/Storage";

// PROPS
interface NewCourseProps {
  toogle: boolean;
}

const NewCourse = (props: NewCourseProps) => {
  // STATE
  const [loading, setLoading] = useState<boolean>(false);
  const [srcIMG, setSrcIMG] = useState<string>("/images/click.jpg");
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
    setLoading(true);
    const files = value.target.files;
    console.log("file-input", files, files[0].name);

    addToStorage("courses", files[0].name, files[0])
      .then((_res) => {
        getURLFromStorage("courses", files[0].name).then((r) => {
          console.log("Respuesta:", _res, r);
          const tmp = course;
          tmp.cover = r;
          setCourse(tmp);
          setSrcIMG(r);
          setLoading(false);
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
        console.error("upload-image-NewCourse", err);
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
          onConfirm: () => {
            location.reload();
          },
        });
      }
    );
  };

  return (
    <div className={props.toogle ? Styles.container_o : Styles.container_c}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <h2>Subiendo imagen... por favor espere</h2>{" "}
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={Styles.header_pass} style={{ display: props.toogle ? "flex" : "none" }}>
        <div className={Styles.box_pass}>
          <h1>1</h1>
          <p>Añade titulo y descripción</p>
        </div>
        <div className={Styles.bar} />
        <div className={Styles.box_pass}>
          <h1>2</h1>
          <p>Sube tu imagen de portada</p>
        </div>
        <div className={Styles.bar} />
        <div className={Styles.box_pass}>
          <h1>3</h1>
          <p>Preciona el boton </p>
        </div>
      </div>
      <div className={Styles.body}>
        {/* TITULO-TEXTO */}
        <section
          className={Styles.cont_form}
          style={{ display: props.toogle ? "flex" : "none" }}
        >
          <h3>Título:</h3>
          <TextField
            fullWidth
            name="title"
            variant="filled"
            className={Styles.textfield}
            style={{ marginBottom: "18px" }}
            onChange={handleChange}
          ></TextField>
          <h3>Descripción:</h3>
          <TextField
            multiline
            fullWidth
            name="description"
            variant="filled"
            className={Styles.textfield}
            onChange={handleChange}
          ></TextField>
        </section>

        {/* IMAGEN */}
        <section
          className={Styles.update_img}
          style={{ display: props.toogle ? "flex" : "none" }}
        >
          <h2>Imagen de portada:</h2>
          <label htmlFor="user_image">
            <img src={srcIMG} alt={course.title} />
          </label>
          <input
            id="user_image"
            accept="image/*"
            type="file"
            multiple={false}
            style={{ display: "none" }}
            onChange={(e: any) => computeImg(e)}
          />
        </section>
        {/* SUBIR */}
        <section>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            style={{ display: props.toogle ? "flex" : "none" }}
            onClick={addNewCourse}
          >
            Subir
          </Button>
        </section>
      </div>
    </div>
  );
};

export default NewCourse;
