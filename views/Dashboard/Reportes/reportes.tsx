import React from "react";

// COMPONENTS
import ViewReport from "./components/ViewReport";

// STYLES
import Styles from "./reportes.module.scss";

// PROPS
interface ReportesProps {
  reports: Report[];
}

const Reportes = ({ reports }: ReportesProps) => {
  return (
    <main className={Styles.container}>
      <section>
        <h1>Solicitudes</h1>
      </section>
      <section>
        {reports.map((report: Report) => (
          <ViewReport report={report} key={report._id} />
        ))}
      </section>
    </main>
  );
};

export default Reportes;
