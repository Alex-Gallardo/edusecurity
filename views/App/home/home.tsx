import React, { useContext, useEffect, useState } from "react";

// CONTEXT
import UserContext from "../../../context/UserContext";

// UTILS
import { getAllFromCollection, saveInCollection } from "utils/DB";

// ROUTER
import { useRouter } from "next/router";

// @MATERIAL
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";

// STYLES
import Styles from "./home.module.scss";

// COMPONENTS
import VideoCmp from "components/app/VideoComponent/VideoCmp";

// ==== COURSES
// {
//   id: "watch-video-01",
//   title: "Ciberseguridad personal",
//   subtitle: "3. Seguridad en redes sociales",
//   score: "2.1",
//   from: "Redait Media",
// },

const c: GComment = {
  _id: new Date().getTime() + "",
  message: "",
  user_id: "",
};

const Home = () => {
  // STATE
  const [comment, setComment] = useState<GComment>(c);
  const [courses, setCourses] = useState<Course[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  // CONTEXT
  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  // ROUTER
  const router = useRouter();

  useEffect(() => {
    // OBTENER TODOS LO CURSOS
    getAllFromCollection<Course>("Courses").then((res: Course[]) =>
      setCourses(res)
    );

    // OBTENER TODOS LOS RECURSOS
    getAllFromCollection<Resource>("Resources").then((res: Resource[]) =>
      setResources(res)
    );
  }, []);

  // MANEJADOR DE TXT - TEACH
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = e;
    console.log(name, value, comment);
    const tmp = comment;
    tmp[name] = value;
    setComment(tmp);
  };

  // ENVIAR A DASHBOARD
  const sendDashboard = () => router.push("/dashboard");

  // ENVIAR A ENCUESTA
  const sudoUpUser = () => {
    // @ts-ignore
    window.Alert({
      title: "Aplica para ser profesor!",
      body: "Cuentanos un poco sobre ti y tus habilidades",
      type: "confirm",
      customElements: (
        <TextField
          name="message"
          label="Tu respuesta"
          multiline
          fullWidth
          maxRows={16}
          onChange={handleChange}
          style={{ marginTop: "16px" }}
          variant="filled"
          helperText="(Ejemplo: Que se te da mejor, Proyectos personales...)"
        />
      ),
      onConfirm: async () => {
        const tmpC = comment;
        if (user) {
          tmpC.user_id = user.uid;
          return await saveInCollection<GComment>(
            tmpC,
            comment._id,
            "RequestCheck"
          ).then((_res) => {
            // @ts-ignore
            window.Alert({
              title: "Solicitud enviada",
              body: "Tu respuesta sera analizada y enseguida se te dara de alta",
              type: "confirm",
            });
          });
        }
      },
    });
  };

  return (
    <main className={Styles.container}>
      {/* HEADER */}
      <section className={Styles.header_info}>
        {/* BIENVENIDA */}
        <div className={Styles.info}>
          <h1>Hola, {user?.name}</h1>
          <div className={Styles.section_info}>
            <h3>({user?.state === 1 ? "Maestro" : "Estudiante"})</h3>
            {user?.state === 1 ? (
              <Rating
                name="read-only"
                value={user.score || 0}
                readOnly
                style={{ marginLeft: "16px" }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        {/* ENSENA / DASHBOARD */}
        {user && user.state === 1 ? (
          <div className={Styles.btn_dash} onClick={sendDashboard}>
            <span>Edu</span> Dashboard
          </div>
        ) : (
          <div className={Styles.btn_teach} onClick={sudoUpUser}>
            Enseña en <span>Edu</span>security
          </div>
        )}
      </section>

      {/* EMPEZEMOS A APRENDER */}
      <section>
        <h1 style={{ marginBottom: "0px" }}>Empezemos a aprender!</h1>
        <div className={Styles.carousel}>
          {resources.map((resource: Resource, index: number) => (
            <VideoCmp
              id={resource._id}
              title={resource.title}
              subtitle={resource.description}
              key={`${resource._id}_${index}`}
            ></VideoCmp>
          ))}
        </div>
      </section>

      {/* QUE APRENDER AHORA */}
      <section>
        <h1 style={{ marginBottom: "0px" }}>Que aprender ahora</h1>
        <div className={Styles.carousel}>
          {courses.map((course) => {
            return (
              <div
                className={Styles.cc2}
                key={`cc2_${course.title}_${course._id}`}
              >
                <img src={course.cover}></img>
                <h4>{course.title}</h4>
                <p>{course.description}</p>
                {/* <p>{course.score}</p> */}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
export default Home;
