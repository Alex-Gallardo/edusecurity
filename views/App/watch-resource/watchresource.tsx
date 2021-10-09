import React from "react";

// COMPONENTS
import ReactPlayer from "react-player";

// STYLES
import Styles from "./watchresource.module.scss";

interface PropsResource {
  resource: Resource;
}

// Obtener recurso de Context
const WatchResource = ({ resource }: PropsResource) => {
  console.log("props", resource);
  return (
    <main className={Styles.container}>
      <section className={Styles.section_info}>
        <h1>{resource.title}</h1>
        <div className={Styles.cont_video}>
          <ReactPlayer
            playing
            controls
            url={resource.resource_url}
            width="100%"
            height="100%"
          />
        </div>
        <h2>Descripción general:</h2>
        <p>{resource.description}</p>
      </section>
      <section className={Styles.section_comments}>
        <h2>Comentarios:</h2>
        <div className={Styles.comments}></div>
      </section>
    </main>
  );
};

export default WatchResource;
