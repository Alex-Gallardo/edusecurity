import React, { useState, useContext } from "react";
import Image from "next/image";

// UTILS
import { addToStorage, getURLFromStorage } from "utils/Storage";

// CONTEXT
import UserContext from "./../../../context/UserContext";

// @MATERIAL
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Add from "@material-ui/icons/Add";

// STYLES
import Styles from "./NewResource.module.scss";
import { saveInCollection } from "utils/DB";

// PROPS
interface NewResourceProps {
  courseID: string;
  resourcesIDS: string[];
}

const NewResource = ({ courseID, resourcesIDS }: NewResourceProps) => {
  // STATE
  const [loading, setLoading] = useState<boolean>(false);
  const [srcIMG, setSrcIMG] = useState<string>("/images/click.jpg");
  const [resource, setResource] = useState<Resource>({
    _id: "",
    user_id: "",
    course_id: "",
    title: "",
    description: "",
    resource_url: "",
    comments: [],
  });

  // CONTEXT
  // * * Traer todos los cursos del CoursesContext * *
  const userCTX = useContext(UserContext);
  const { user } = userCTX;

  // SETEAR VALORES
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setResource((state) => ({ ...state, [name]: value }));
  };

  // COMPUTAR STORAGE-FIREBASE - Video
  const computeImg = (value: any) => {
    setLoading(true);
    const files = value.target.files;
    console.log("file-input", files, files[0].name);

    addToStorage(user.uid, files[0].name, files[0])
      .then((_res) => {
        getURLFromStorage(user.uid, files[0].name).then((r) => {
          console.log("Respuesta:", _res, r);
          const tmp = resource;
          tmp.resource_url = r;
          setResource(tmp);
          setSrcIMG(
            "https://images.assetsdelivery.com/thumbnails/blankstock/blankstock1802/blankstock180200731.jpg"
          );
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
        setLoading(false);
        // @ts-ignore
        window.Alert({
          title: "Uppss, a ocurrido un error!",
          body: "Hubo un error en la subida del archivo, intenta recargar la pagina e intentalo de nuevo",
          type: "error",
        });
        console.error("upload-image-NewResource", err);
      });
  };

  // CREAR NUEVO CURSO
  const addNewResource = () => {
    const tmpResource: Resource = resource;
    tmpResource._id = new Date().getTime() + "";
    tmpResource.user_id = user.uid;
    tmpResource.course_id = courseID;
    console.log("tmpCourse:", tmpResource);

    if (tmpResource.resource_url !== "") {
      // @ts-ignore
      saveInCollection<Resource>(
        tmpResource,
        tmpResource._id,
        "Resources",
        true
      )
        .then((_res) => {
          setResource({
            ...resource,
            title: "",
            description: "",
            resource_url: "",
            _id: "",
          });

          const tmpResources: string[] = resourcesIDS;
          tmpResources.push(tmpResource._id);

          saveInCollection<Course>(
            { resources_id: tmpResources },
            courseID,
            "Courses",
            true
          ).then((_res2) => {
            // @ts-ignore
            window.Alert({
              title: "Recurso a??adido exitosamente",
              body: `El recurso "${resource.title}" se a??adio a tu colecci??n de recursos.`,
              type: "confirm",
              onConfirm: () => location.reload(),
            });
          });

          // SI HAY ERROR
        })
        .catch((err) => {
          console.error("uploadResource-state(Resource)-NewResource.tsx:", err);
          // @ts-ignore
          window.Alert({
            title: "Ha ocurrido un error!",
            body: `El recurso "${resource.title}" no se a??adio a tu colecci??n de recursos.`,
            type: "confirm",
          });
        });
    } else {
      window.Alert({
        title: "Error al subir archivos",
        body: "Es necesario que subas un video, para poder crear el recurso",
        type: "error",
      });
    }
  };

  return (
    <div className={Styles.box}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <h2>Subiendo recurso... por favor espere</h2>{" "}
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className={Styles.cont_dat}>
        <h3>Sube un video:</h3>
        <label htmlFor="user_image">
          <Image
            className={Styles.img}
            src={srcIMG}
            alt={resource._id}
            unoptimized
            width="264px"
            height="150px"
          />
        </label>
        <input
          id="user_image"
          accept="video/*"
          // accept="video/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          type="file"
          multiple={false}
          style={{ display: "none" }}
          onChange={(e: any) => computeImg(e)}
        />
        <p>
          (La calidad soportada es hasta 720px, no se permiten videos mayores a
          los 10 min.)
        </p>
      </section>
      <section>
        <h3>T??tulo:</h3>
        <TextField
          fullWidth
          name="title"
          placeholder="T??tulo"
          className={Styles.textfield}
          onChange={handleChange}
        ></TextField>
        <h3>Descripci??n:</h3>
        <TextField
          multiline
          fullWidth
          name="description"
          placeholder="Descripci??n"
          className={Styles.textfield}
          onChange={handleChange}
        ></TextField>
        <Button
          startIcon={<Add />}
          variant="outlined"
          color="inherit"
          onClick={addNewResource}
        >
          Subir
        </Button>
      </section>
    </div>
  );
};

export default NewResource;
