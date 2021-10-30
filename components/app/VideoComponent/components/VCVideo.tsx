import React, { useState } from "react";
import Router from "next/router";

// @MATERIAL
import Report from "@material-ui/icons/Report";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// STYLES
import Styles from "./VCVideo.module.scss";
import { saveInCollection } from "utils/DB";

interface VCVideo {
  video: Resource;
  onReport: any;
}

const VCVideo = ({ video, onReport }: VCVideo) => {
  // STADO REPORTE
  const [report, setReport] = useState<Report>({
    _id: "",
    message: "",
    state: false,
    type: 1,
  });

  const handleChange = (event) => {
    const tmpReport: Report = report;
    tmpReport[event.target.name] = event.target.value;
    setReport(tmpReport);
  };

  // REPORTAR VIDEO
  const reportVideo = () => {
    onReport();

    window.Alert({
      title: "Reportar video!",
      body: "",
      type: "confirm",
      customElements: (
        <div className={Styles.alert_cont}>
          <p>Elige el tipo de reporte</p>
          <Select
            fullWidth
            name="type"
            defaultValue={report.type + ""}
            onChange={handleChange}
          >
            <MenuItem value={0}>Reportar profesor</MenuItem>
            <MenuItem value={1}>Reportar video</MenuItem>
            <MenuItem value={2}>Reportar comentario</MenuItem>
          </Select>
          <p>Indicanos el motivo del reporte</p>
          <TextField
            fullWidth
            multiline
            maxRows={8}
            name="message"
            onChange={handleChange}
          />
        </div>
      ),
      onConfirm: () => {
        const tmpRP: Report = report;
        tmpRP._id = new Date().getTime() + "";
        tmpRP.video_id = video.title;

        saveInCollection<Report>(tmpRP, tmpRP._id, "Reports")
          .then((_res) => {
            window.Alert({
              title: "Reporte subido correctamente",
              body: "Tu reporte se envio a los administradores, se analizara tu respuesta para tomar la mejor desicion",
              type: "confirm",
              onConfirm: () =>
                setReport({ _id: "", message: "", state: false, type: 1 }),
            });
          })
          .catch((err) => {
            window.Alert({
              title: "Upss ocurrio un error",
              body: "Tenemos problemas en la red, tu reporte no se ha podido enviar. Recarga la pagina o intentalo mas tarde ",
              type: "error",
            });
            console.error("saveReport-VCVideo-reportVideo:", err);
          });
      },
    });
  };

  // ENVIAR A WATCH
  const watchResource = (rid: string) => () => {
    Router.replace({ pathname: "/watch/[rid]", query: { rid } });
  };

  return (
    <div className={Styles.video} key={video._id}>
      <div className={Styles.header}>
        <p>{video.comments?.length || 0} - comentarios</p>
        <Tooltip title="Reportar video" onClick={reportVideo}>
          <Report color="disabled" />
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
