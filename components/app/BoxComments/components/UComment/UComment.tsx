import React, { useEffect, useState } from "react";

// UTILS
import { getFromCollection, saveInCollection } from "utils/DB";

// COMPONENTS
import IconButton from "@mui/material/IconButton";
import Report from "@material-ui/icons/Report";

// STYLES
import Styles from "./UComment.module.scss";
import { Select } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

// PROPS
interface UCommentProps {
  comment: GComment;
  resourceTitle: string;
}

const UComment = ({ comment, resourceTitle }: UCommentProps) => {
  // STATE
  const [img, setImg] = useState<string>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  // STADO REPORTE
  const [report, setReport] = useState<Report>({
    _id: "",
    message: "",
    state: false,
    type: 2,
  });

  useEffect(() => {
    // OBTENER DATOS DEL USUARIO
    getFromCollection<User>(comment.user_id, "users").then((res: User) =>
      setImg(res.photo_url)
    );
  });

  const handleChange = (event) => {
    const tmpReport: Report = report;
    tmpReport[event.target.name] = event.target.value;
    setReport(tmpReport);
  };

  // REPORTAR COMENTARIO
  const reportComment = () => {
    window.Alert({
      title: "Reportar comentario!",
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
        tmpRP.video_id = resourceTitle

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

  return (
    <div className={Styles.container}>
      <img src={img} alt={comment._id} />
      <section className={Styles.comments}>
        <p>{comment.message}</p>
        <hr />
      </section>
      <IconButton onClick={reportComment}>
        <Report color="disabled" />
      </IconButton>
    </div>
  );
};

export default UComment;
