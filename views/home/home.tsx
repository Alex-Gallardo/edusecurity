import Styles from "./home.module.scss";
import { useContext } from "react";
import UserContext from "./../../context/UserContext";
import Router from "next/router";

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

const Home = () => {
  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  // ENVIAR A WATCH
  const watchResource = (id) => () => {
    Router.replace({ pathname: "/watch/[id]", query: { id } });
  };

  return (
    <main className={Styles.container}>
      {/* HEADER */}
      <section className={Styles.header_info}>
        <div className={Styles.info}>
          <h1>Hola, {user?.name}</h1>
          <div className={Styles.section_info}>
            <h3>({user?.state === 0 ? "Estudiante" : "Maestro"})</h3>
            <p>4.0</p>
          </div>
        </div>
        <div className={Styles.class}>
          Enseña en <span>Edu</span>security
        </div>
      </section>

      {/* EMPEZEMOS A APRENDER */}
      <section>
        <h1>Empezemos a aprender, {user?.name}</h1>
        <div className={Styles.carousel}>
          {courses.map((course) => {
            return (
              <div
                className={Styles.course_component}
                key={`cc1_${course.title}_${course.subtitle}`}
                onClick={watchResource(course.id)}
              >
                <img src="https://enerjoy.co.za/wp-content/uploads/2018/04/play-video.png"></img>
                <div className={Styles.info_course}>
                  <p>{course.title}</p>
                  <h3>{course.subtitle}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* QUE APRENDER AHORA */}
      <section>
        <h1>Que aprender ahora</h1>
        <div className={Styles.carousel}>
          {courses.map((course) => {
            return (
              <div
                className={Styles.cc2}
                key={`cc2_${course.title}_${course.subtitle}`}
                onClick={watchResource(course.id)}
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
