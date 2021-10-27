import React, { useState, useEffect } from "react";

// UTILS
import { getAllFromCollection } from "utils/DB";

// COMPONENTS
import VCVideo from "./components/VCVideo";

// @MATERIAL
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";

// STYLES
import Styles from "./VideoCmp.module.scss";

// PROPS
interface VideoCmpProps {
  course: Course;
}

const VideoCmp = (props: VideoCmpProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<Resource[]>([]);

  // PROPS
  const { course } = props;

  useEffect(() => {
    let resources: Resource[] = [];

    getAllFromCollection<Resource>("Resources")
      .then((res: Resource[]) => {
        resources = res.filter((r) => r.course_id === course._id);
        setVideos(resources);
      })
      .catch((err) =>
        console.log("obtencionDeTodoCursos-VideoCmp-getAllFromCollection", err)
      );
  }, []);

  // ABRIR INFO CURSO
  const openViewCourse = () => setLoading(true);
  const closeViewCourse = () => setLoading(false);

  return (
    <div className={Styles.container}>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <main className={Styles.modal_}>
          <h2 style={{ marginTop: "6px" }}>Videos de "{course.title}"</h2>
          <div className={Styles.carousel}>
            {videos.map((video: Resource) => (
              <VCVideo
                video={video}
                key={video._id}
                onReport={closeViewCourse}
              />
            ))}
          </div>
          <div className={Styles.cont_actionbtn}>
            <Button
              variant="outlined"
              color="primary"
              onClick={closeViewCourse}
            >
              Cerrar
            </Button>
          </div>
        </main>
      </Backdrop>
      <div
        className={Styles.viewer}
        style={{ backgroundImage: `url("${course.cover}")` }}
        onClick={openViewCourse}
      ></div>
      <div className={Styles.info_course} onClick={openViewCourse}>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
      </div>
    </div>
  );
};

export default VideoCmp;
