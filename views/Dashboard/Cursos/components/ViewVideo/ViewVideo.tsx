import React from "react";

// @MATERIAL
import Delete from "@material-ui/icons/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// STYLES
import Styles from "./ViewVideo.module.scss";

// PROPS
interface ViewVideoProps {
  resource: Resource;
}

const ViewVideo = ({ resource }: ViewVideoProps) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.ctn_info}>
        <h2>{resource.title}</h2>
        <p className={Styles.prrf}>{resource.description}</p>
        <p>Comentarios: {resource.comments?.length || 0}</p>
      </div>
      <div className={Styles.actions}>
        <Tooltip title="Eliminar video">
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ViewVideo;
