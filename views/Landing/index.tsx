import React from "react";

// @MATERIAL
import Button from "@mui/material/Button";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Grade from "@material-ui/icons/Grade";
import AllInclusive from "@material-ui/icons/AllInclusive";

// STYLES
import Styles from "./index.module.scss";
import { useRouter } from "next/router";

const LandingPage = () => {
  // ROUTER
  const router = useRouter();

  // ENVIAR A LOGIN
  const sendToLogin = () => router.push("/login");

  // ENVIAR A REGISTER
  const sendToRegister = () => router.push("/register");

  return (
    <main className={Styles.main}>
      {/* TOPBAR */}
      <section className={Styles.topbar}>
        <h2>EduSecurity</h2>
        <div className={Styles.cont_btns}>
          <Button
            variant="outlined"
            className={Styles.btn}
            onClick={sendToLogin}
          >
            Iniciar sesión
          </Button>
          <Button variant="contained" onClick={sendToRegister}>
            Registrarse
          </Button>
        </div>
      </section>

      {/* CONTENEDOR CENTRAL */}
      <div className={Styles.container}>
        <div className={Styles.box}>
          <div className={Styles.square}>
            <h3>Disfruta de nuestro contenido</h3>
            <p>¡Cursos diseñados para ayudarte a conseguir tus objetivos!</p>
          </div>
        </div>
        <h2>Una amplia seleccion de cursos</h2>
        <p>
          Elige entre los mejores cursos en video y en línea. con contenido
          dedicado a la seguridad informática.
        </p>
        <div className={Styles.types}>
          <p>Seguridad en línea</p>
          <p>Uso del Internet</p>
          <p>Dispositivos Tecnológicos</p>
          <p>Peligros del Internet</p>
          <p>Controles Cibernéticos</p>
        </div>
        <div className={Styles.box_outlined}>
          <h3>
            Mejora tus habilidades en tecnología de la mano de la ciberseguridad
            con Edusecurity.
          </h3>
          <p>
            Tanto si conoces, redes, ciencias, matemáticas, lenguaje o bien otro
            curso, si deseas desarrollar mejorar y aprender nuevas habilidades
            que perfeccionaran tu desempeño y el de tus estudiantes.
          </p>
          <Button variant="outlined" onClick={sendToLogin}>
            Explora edusecurity
          </Button>
          <div className={Styles.carousel}></div>
        </div>
      </div>

      {/* DIV-CENTER */}
      <section className={Styles.center_bar}>
        <div className={Styles.boxito}>
          <div className={Styles.cont_icon}>
            <PlayArrow />
          </div>
          <p>Aprende habilidades a tu ritmo con más de 100 hrs en video</p>
        </div>
        <div className={Styles.boxito}>
          <div className={Styles.cont_icon}>
            <Grade />
          </div>
          <p>Toma cursos impartidos por expertos del mundo real</p>
        </div>
        <div className={Styles.boxito}>
          <div className={Styles.cont_icon}>
            <AllInclusive />
          </div>
          <p>
            Aprende a tu propio ritmo con acceso de por vida desde ordenadores
          </p>
        </div>
      </section>

      {/* CONVIERTETE EN INSTRUCTOR */}
      <div className={Styles.contained}>
        <img
          src="https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg"
          alt="instructor"
        />
        <div className={Styles.info}>
          <h1>Conviértete en instructor!</h1>
          <p>
            Instructores capacitados enseñan en Edusecurity. Proporcionamos las
            herramientas y las habilidades para que aprendas y enseñes con las
            mejores prácticas.
          </p>
          <Button variant="contained" onClick={sendToLogin}>
            Iniciar sesión
          </Button>
        </div>
      </div>
      <footer>
        <h2>EduSecurity</h2>
        <div className={Styles.f_info}>
          <p>Español</p>
          <p>©2021 Edusecurity Inc.</p>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
