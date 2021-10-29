import React from "react";

// UTILS
import { deleteFromCollection } from "utils/DB";

// @MATERIAL
import Delete from "@material-ui/icons/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// STYLES
import Styles from "./ViewVideo.module.scss";

// PROPS
interface ViewVideoProps {
  resource: Resource;
  cid: string;
  videos: string[]
}

const ViewVideo = ({ resource, cid, videos }: ViewVideoProps) => {
  // ELIMINAR VIDEO
  const deleteVideo = ()=>{

    // Queda pendiente la eliminacion del resource_id del curso

    // const tmpVideos = videos.filter((id)=>id !== resource._id)
    // console.log(videos, tmpVideos)

    window.Alert({
      title: "Eliminar curso",
      body: "Seguro que quieres eliminar este video? (Se eliminara de forma permanete)",
      type: "confirm",
      onConfirm: () => {
        deleteFromCollection(resource._id, "Resources")
          .then((_res) => {
            window.Alert({
              title: "Video eliminado!",
              body: `Video "${resource.title}" eliminado correctamente`,
              type: "confirm",
              onConfirm: () => location.reload(),
            });
          })
          .catch((err) => console.log("deleteVideo-ViewVideo:", err));
      },
    });
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.ctn_info}>
        <h2>{resource.title}</h2>
        <p className={Styles.prrf}>{resource.description}</p>
        <p>Comentarios: {resource.comments?.length || 0}</p>
      </div>
      <div className={Styles.actions}>
        <Tooltip title="Eliminar video">
          <IconButton onClick={deleteVideo}>
            <Delete />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ViewVideo;
