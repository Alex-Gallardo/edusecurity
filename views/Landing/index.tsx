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
        <h2>EduSegurity</h2>
        <div className={Styles.cont_btns}>
          <Button
            variant="outlined"
            className={Styles.btn}
            onClick={sendToLogin}
          >
            Iniciar sessión
          </Button>
          <Button variant="contained" onClick={sendToRegister}>
            Regístrate
          </Button>
        </div>
      </section>

      {/* CONTENEDOR CENTRAL */}
      <div className={Styles.container}>
        <div className={Styles.box}>
          <div className={Styles.square}>
            <h3>Disfruta de nuestro contenido</h3>
            <p>Cursos diseñados para ayudarte a conseguir tus objetivos!</p>
          </div>
        </div>
        <h2>Una amplia seleccion de cursos</h2>
        <p>
          Elige entre los mejores cursos en video y en línea. con contenido
          dedicado a la seguridad informatica.
        </p>
        <div className={Styles.types}>
          <p>Hacking</p>
          <p>Read Team</p>
          <p>Scaning</p>
          <p>Sniffing</p>
          <p>Intruición</p>
        </div>
        <div className={Styles.box_outlined}>
          <h3>Amplía tus oportunidades profesionales con Edusegurity</h3>
          <p>
            Tanto si trabajas en el segmento de desarrollo, redes,
            infraestructura, programacion o cualquier otra ciencia digital, si
            deseas desarrollar tu carrera en hacking o volverte un experto en
            Red Team.{" "}
          </p>
          <Button variant="outlined" onClick={sendToLogin}>Explorar Edusegurity</Button>
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
            Instructores de todo el mundo enseñan en Edusegurity. Proporcionamos
            la herramientas y las habilidades para que enseñes lo que te
            apasiona
          </p>
          <Button variant="contained" onClick={sendToLogin}>Empieza en edusegurity</Button>
        </div>
      </div>
      <footer>
        <h2>EduSegurity</h2>
        <div className={Styles.f_info}>
          <p>Español</p>
          <p>©2021 Edusecurity Inc.</p>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
