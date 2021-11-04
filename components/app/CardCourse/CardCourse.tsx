import React, { useContext, useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";

// UTILS
import { getFromCollection, saveInCollection } from "utils/DB";

// CONTEXT
import UserContext from "context/UserContext";

// @MATERIAL
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";

// STYLES
import Styles from "./CardCourse.module.scss";

// PROPS
interface CardCourseProps {
  course: Course;
  action?: boolean;
}

const CardCourse = (props: CardCourseProps) => {
  // PROPS
  const { course } = props;

  // STATE
  const [loading, setLoading] = useState<boolean>(false);
  const [teacher, setTeacher] = useState<string[]>([
    "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
    "",
  ]);

  // CONTEXT
  const userCTX = useContext(UserContext);
  const { user } = userCTX;

  useEffect(() => {
    getFromCollection<User>(course.user_id, "users")
      .then((res: User) =>
        setTeacher([res.photo_url, `${res.name} ${res.last_name}`])
      )
      .catch((err) => console.error("getUser-CardCourse", err));
  }, []);

  // ABRIR INFO CURSO
  const openViewCourse = () => setLoading(true);
  const closeViewCourse = () => setLoading(false);

  // AGREGAR CURSO A USUARIO
  const addCourseTaken = () => {
    let ok: boolean = true;

    if (user) {
      user.courses_taken.forEach((idC: string) => {
        if (course._id === idC) {
          // @ts-ignore
          window.Alert({
            title: "Curso ya agregado!",
            body: "Este curso ya lo tienes en tu lista de cursos agregados, intenta añadir a tu lista otro curso distinto",
            type: "confirm",
          });
          closeViewCourse();
          ok = false;
          return;
        }
      });
    }

    if (ok) {
      closeViewCourse();
      const tmpCTK = user.courses_taken;
      tmpCTK.push(course._id);

      saveInCollection<User>({ courses_taken: tmpCTK }, user.uid, "users", true)
        .then((_res) => {
          const tmpStds: string[] = course.students;
          tmpStds.push(user.uid);
          saveInCollection<Course>(
            { students: tmpStds },
            course._id,
            "Courses",
            true
          )
            .then((_res2) => {
              // @ts-ignore
              window.Alert({
                title: "Curso añadido!",
                body: `El curso "${course.title}" esta disponible en tu lista de cursos`,
                type: "confirm",
                onConfirm: () => {
                  location.reload();
                },
              });
            })
            .catch((err) =>
              console.error("addStudentCouse-CardCourse-students:", err)
            );
        })
        .catch((err) =>
          console.error("saveCouseTaken-CardCourse-courses_taken:", err)
        );
    }
  };

  // ENVIAR A WATCH
  const watchResource = (cid) => () => {
    Router.replace({ pathname: "/dashboard/[cid]", query: { cid } });
  };

  return (
    <div className={Styles.box}>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <main className={Styles.modal_}>
          <div className={Styles.cont_1}>
            <Image
              src={course.cover}
              className={Styles.img}
              alt="Background-Image"
              unoptimized
              height="100%"
              width="300px"
            />
            <section className={Styles.modal_info}>
              <h2>{course.title}</h2>
              <Rating
                readOnly
                size="medium"
                value={course.score}
                style={{ marginBottom: "12px" }}
              />
              <p>{course.description}</p>
              <div className={Styles.modal_stadistics}>
                <p>Estudiantes: {course.students.length}</p>
                <p>Videos: {course.resources_id.length}</p>
              </div>
              <div className={Styles.modal_pro}>
                <div className={Styles.cont_img}>
                  <Image
                    src={teacher[0]}
                    className={Styles.img_pro}
                    alt="profile"
                    unoptimized
                    width="30px"
                    height="30px"
                  />
                </div>
                <p>{teacher[1]}</p>
              </div>
            </section>
          </div>
          <div className={Styles.modal_actions}>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginRight: "24px" }}
              onClick={closeViewCourse}
            >
              Cancelar
            </Button>
            <Button variant="contained" onClick={addCourseTaken}>
              Empezar
            </Button>
          </div>
        </main>
      </Backdrop>
      <Image
        src={course.cover}
        alt="EduCourse"
        unoptimized
        className={Styles.img}
        width="250px"
        height="150px"
      />
      <section className={Styles.cont_info}>
        <h3>{course.title}</h3>
        <Rating readOnly size="small" value={course.score} />
        <p>{course.description}</p>
        <hr />
        {props.action ? (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={watchResource(course._id)}
          >
            CONFIG
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={openViewCourse}
          >
            Ver
          </Button>
        )}
      </section>
    </div>
  );
};

export default CardCourse;
