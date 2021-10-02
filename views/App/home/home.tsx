import React, { useContext, useState } from "react";

// CONTEXT
import UserContext from "../../../context/UserContext";

// STYLES
import Styles from "./home.module.scss";

// COMPONENTS
import VideoCmp from "components/app/VideoComponent/VideoCmp";

// @MATERIAL
import TextField from "@material-ui/core/TextField";
import { saveInCollection } from "utils/DB";

// ==== COURSES
const courses = [
  {
    id: "watch-video-01",
    title: "Ciberseguridad personal",
    subtitle: "3. Seguridad en redes sociales",
    score: "2.1",
    from: "Redait Media",
  },
  {
    id: "watch-video-02",
    title: "Hacking con python",
    subtitle: "13. Escaneo de puertos",
    score: "4.1",
    from: "Redait Media",
  },
  {
    id: "watch-video-03",
    title: "Pentest con Foca",
    subtitle: "12. Manejo de metadatos",
    score: "4.7",
    from: "Redait Media",
  },
  {
    id: "watch-video-04",
    title: "Amazon AWS Basico",
    subtitle: "1. Conceptos basicos",
    score: "5.0",
    from: "Redait Media",
  },
];

const c: GComment = {
  _id: new Date().getTime() + "",
  message: "",
  user_id: "",
};

const Home = () => {
  const [comment, setComment] = useState<GComment>(c);

  const userCtx = useContext(UserContext);
  const { user } = userCtx;

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

  // ENVIAR A ENCUESTA
  const sudoUpUser = () => {
    // @ts-ignore
    window.Alert({
      title: "Aplica para profesor!",
      body: "Cuales son tus habilidades?",
      type: "confirm",
      customElements: (
        <TextField
          id="outlined-multiline-static"
          name="message"
          style={{ marginTop: "16px" }}
          multiline
          fullWidth
          label="Tu respuesta"
          maxRows={16}
          onChange={handleChange}
        />
      ),
      onConfirm: async () => {
        if (user) {
        }
        return await saveInCollection<GComment>(
          comment,
          comment._id,
          "RequestCheck"
        );
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
            <h3>({user?.state === 0 ? "Estudiante" : "Maestro"})</h3>
            <p>4.0</p>
          </div>
        </div>
        {/* ENSENA / DASHBOARD */}
        {user && user.state === 0 ? (
          <div className={Styles.btn_teach} onClick={sudoUpUser}>
            Enseña en <span>Edu</span>security
          </div>
        ) : (
          <div className={Styles.btn_dash}>
            <span>Edu</span> Dashboard
          </div>
        )}
      </section>

      {/* EMPEZEMOS A APRENDER */}
      <section>
        <h1 style={{marginBottom: '0px'}}>Empezemos a aprender!</h1>
        <div className={Styles.carousel}>
          {courses.map((course) => (
            <VideoCmp
              id={course.id}
              title={course.title}
              subtitle={course.subtitle}
            ></VideoCmp>
          ))}
        </div>
      </section>

      {/* QUE APRENDER AHORA */}
      <section>
        <h1 style={{marginBottom: '0px'}}>Que aprender ahora</h1>
        <div className={Styles.carousel}>
          {courses.map((course) => {
            return (
              <div
                className={Styles.cc2}
                key={`cc2_${course.title}_${course.subtitle}`}
              >
                <img src="https://enerjoy.co.za/wp-content/uploads/2018/04/play-video.png"></img>
                <h4>{course.title}</h4>
                <p>{course.from}</p>
                <p>{course.score}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
export default Home;
