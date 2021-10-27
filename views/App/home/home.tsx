import React, { useContext, useEffect, useState } from "react";

// CONTEXT
import UserContext from "../../../context/UserContext";

// UTILS
import { getAllFromCollection, saveInCollection } from "utils/DB";

// ROUTER
import { useRouter } from "next/router";

// COMPONENTS
import VideoCmp from "components/app/VideoComponent/VideoCmp";
import CardCourse from "components/app/CardCourse/CardCourse";

// @MATERIAL
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";

// STYLES
import Styles from "./home.module.scss";

const c: GComment = {
  _id: new Date().getTime() + "",
  message: "",
  user_id: "",
};

// PROPS
interface HomeProps {
  courses: Course[];
  coursesTaken: Course[];
}

const Home = ({ courses, coursesTaken }: HomeProps) => {
  // STATE
  const [comment, setComment] = useState<GComment>(c);

  // CONTEXT
  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  // ROUTER
  const router = useRouter()

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
          {coursesTaken.map((course: Course, index: number) => (
            <VideoCmp course={course} key={`${course._id}_${index}`} />
          ))}
        </div>
      </section>

      {/* QUE APRENDER AHORA */}
      <section>
        <h1 style={{ marginBottom: "0px" }}>Que aprender ahora</h1>
        <div className={Styles.carousel}>
          {courses.map((course) => (
            <CardCourse course={course} key={`${course._id}${course.title}`} />
          ))}
        </div>
      </section>
    </main>
  );
};
export default Home;
