import React, { useEffect, useState } from "react";

// COMPONENTS
import ViewVideo from "../ViewVideo/ViewVideo";

// UTILS
import { deleteFromCollection } from "utils/DB";

// @MATERIAL
import IconButton from "@mui/material/IconButton";
import Delete from "@material-ui/icons/Delete";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";

// STYLES
import Styles from "./ViewCourse.module.scss";

// PROPS
interface ViewCourseProps {
  course: Course;
  resources: Resource[];
}

const ViewCourse = ({ course, resources }: ViewCourseProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<Resource[]>([]);

  useEffect(() => {
    let tmpR = null;
    tmpR = resources.filter((res: Resource) => res.course_id === course._id);
    if (tmpR) {
      setVideos(tmpR);
    }
  }, [resources]);

  // BORRAR CURSO
  const deleteCourse = () => {
    window.Alert({
      title: "Eliminar curso",
      body: "Seguro que quieres eliminar este curso? (Se eliminara de forma permanete)",
      type: "confirm",
      onConfirm: () => {
        deleteFromCollection(course._id, "Courses")
          .then((_res) => {
            window.Alert({
              title: "Curso eliminado!",
              body: `Curso "${course.title}" eliminado correctamente`,
              type: "confirm",
              onConfirm: () => location.reload(),
            });
          })
          .catch((err) => console.log("deleteCourse-ViewCourse:", err));
      },
    });
  };

  return (
    <div className={Styles.container}>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <main className={Styles.modal_}>
          <h2 style={{marginTop: '8px'}}>Videos de: {course.title}</h2>
          <div className={Styles.cont_1}>
            {videos.map((r: Resource, i: number) => {
              return <ViewVideo resource={r} cid={course._id} videos={course.resources_id} key={`${r._id}_${i}`} />;
            })}
          </div>
          <div className={Styles.modal_actions}>
            <Button variant="contained" onClick={() => setLoading(false)}>
              Cerrar
            </Button>
          </div>
        </main>
      </Backdrop>

      {/* CARD-COURSE */}
      <div
        className={Styles.img}
        style={{ backgroundImage: `url("${course.cover}")` }}
      />
      <div className={Styles.course_info} onClick={() => setLoading(true)}>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>
      <div className={Styles.actions}>
        <Tooltip title="Eliminar video">
          <IconButton onClick={deleteCourse}>
            <Delete color="disabled" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ViewCourse;
