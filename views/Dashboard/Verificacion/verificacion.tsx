import React from "react";

// STYLES
import Styles from "./verificacion.module.scss";
import ViewRequest from './../../../components/dashboard/ViewRequest/ViewRequest';

// PROPS
interface VerifiProps {
  requets: GComment[];
}
const Verificacion = ({ requets }: VerifiProps) => {
  return (
    <main className={Styles.container}>
      <section>
        <h1>Solicitudes</h1>
      </section>
      <section>
        {requets.map((sol: GComment, i: number) => (
          <ViewRequest request={sol} key={`${sol._id}_${i}`}></ViewRequest>
        ))}
      </section>
    </main>
  );
};

export default Verificacion;
