import React, { useContext, useEffect, useRef, useState } from "react";

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
  search?: string;
}

const Home = ({ courses, coursesTaken, search }: HomeProps) => {
  // STATE
  const [comment, setComment] = useState<GComment>(c);
  const [cc, setCC] = useState<Course[]>([]);

  // CONTEXT
  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  // ROUTER
  const router = useRouter();

  // REF
  const coursesRef: React.MutableRefObject<Course[]> = useRef<Course[]>([]);

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

  useEffect(() => {
    console.log("c-c:", courses, "\ncc:", cc);
    coursesRef.current = courses
    setCC(courses);
  }, [courses]);

  useEffect(() => {
    console.log("Entro a search", search);
    changeSearchHome(search);
  }, [search]);

  // BUSCADOR
  const changeSearchHome = (val: string) => {
    // NORMALIZAR ENTRADAS
    const nfd = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // OBTENER DATOS
    let filterCourses: Course[] = [];

    if(val.length > 0){
      console.log("ENTRO A SEARCH", val)

      // FILTRAR POSTS
      filterCourses = coursesRef.current.filter((courseHome: Course) => {
        if (nfd(courseHome.title).indexOf(nfd(val)) >= 0) return true;
        return false;
      });
  
      // ACTUALIZAR ESTADOS
      setTimeout(() => {
        setCC([...filterCourses]);
      }, 200);
    }else{
      setTimeout(() => {
        setCC([...coursesRef.current]);
      }, 200);
    }

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
            Ense??a en <span>Edu</span>security
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
          {cc.length > 0 ? (
            cc.map((course) => (
              <CardCourse
                course={course}
                key={`${course._id}${course.title}`}
              />
            ))
          ) : (
            <p>Sin cursos</p>
          )}
        </div>
      </section>
    </main>
  );
};
export default Home;
