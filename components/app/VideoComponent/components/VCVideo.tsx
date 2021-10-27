import React from "react";
import Router from "next/router";

// @MATERIAL
import Report from "@material-ui/icons/Report";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

// STYLES
import Styles from "./VCVideo.module.scss";

interface VCVideo {
  video: Resource;
  onReport: any;
}

const VCVideo = ({ video, onReport }: VCVideo) => {
  // REPORTAR VIDEO
  const reportVideo = () => {
    onReport();

    // @ts-ignore
    window.Alert({
      title: "Reportar video!",
      body: "",
      type: "confirm",
      customElement: () => {
        return (
          <div className={Styles.alert_cont}>
            <TextField />
          </div>
        );
      },
    });
  };

  // ENVIAR A WATCH
  const watchResource = (rid: string) => ()=> {
    Router.replace({ pathname: "/watch/[rid]", query: { rid } });
  };

  return (
    <div className={Styles.video} key={video._id}>
      <div className={Styles.header}>
        <p>{video.comments?.length || 0} - comentarios</p>
        <Tooltip title="Reportar video" onClick={reportVideo}>
          <Report color='disabled'/>
        </Tooltip>
      </div>
      <div className={Styles.info} onClick={watchResource(video._id)}>
        <h2>{video.title}</h2>
        <p>{video.description}</p>
      </div>
    </div>
  );
};

export default VCVideo;
