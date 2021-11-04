import React from "react";

// @MATERIAL
import Button from "@mui/material/Button";

// STYLES
import Styles from "./ViewReport.module.scss";
import { saveInCollection } from "utils/DB";

// PROPS
interface ViewReportProps {
  report: Report;
}

const ViewReport = ({ report }: ViewReportProps) => {
  const computeHecho = () => {
    saveInCollection<Report>({ state: true }, report._id, "Reports", true)
      .then((_res) => {
        window.Alert({
          title: "Reporte solucionado",
          body: "El reporte ha sido actualizado a hecho!",
          type: "confirm",
          onConfirm: () => {
            location.reload();
          },
        });
      })
      .catch((err) => {
        window.Alert({
          title: "Error al actualizar",
          body: "El reporte NO ha sido actualizado, por favor recarge la pagina o intentelo mas tarde",
          type: "error",
        });
        console.error("updateReport-ViewReport-computeHecho:", err);
      });
  };

  return (
    <div className={Styles.cont}>
      <section className={Styles.header}>
        <h2>
          Tipo de reporte:
          <span>
            {report.type === 0
              ? "Reporte de profesor"
              : report.type === 1
              ? "Reporte de video"
              : "Reporte de comentario"}
          </span>
        </h2>
      </section>
      <section className={Styles.body}>
        <p style={{ fontWeight: "bold", marginBottom: "4px" }}>Mensaje:</p>
        <p>{report.message}</p>
      </section>
      <section className={Styles.firma}>
        <div className={Styles.firma_info}>
          {report.user_id ? (
            <h2>
              Profesor: <span>{report.user_id}</span>
            </h2>
          ) : (
            ""
          )}
          {report.course_id ? (
            <h2>
              Curso: <span>{report.course_id}</span>
            </h2>
          ) : (
            ""
          )}
          {report.video_id ? (
            <h2>
              Video: <span>{report.video_id}</span>
            </h2>
          ) : (
            ""
          )}
          <h2></h2>
        </div>
        <Button variant="contained" onClick={computeHecho}>
          {" "}
          Hecho
        </Button>
      </section>
    </div>
  );
};

export default ViewReport;
