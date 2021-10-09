import React from "react";
import Router from "next/router";

// STYLES
import Styles from "./VideoCmp.module.scss";

// PROPS
interface VideoCmpProps {
  id: string;
  title: string;
  subtitle: string;
}

const VideoCmp = (props: VideoCmpProps) => {
  const { id, title, subtitle } = props;

  // ENVIAR A WATCH
  const watchResource = () => {
    Router.replace({ pathname: "/watch/[rid]", query: { rid: id } });
  };

  return (
    <div className={Styles.container} onClick={watchResource}>
      <div className={Styles.viewer}></div>
      <div className={Styles.info_course}>
        <p>{title}</p>
        <h3>{subtitle}</h3>
      </div>
    </div>
  );
};

export default VideoCmp;
