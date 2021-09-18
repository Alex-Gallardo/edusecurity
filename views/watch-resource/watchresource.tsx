import { NextPage } from "next";
import Styles from "./watchresource.module.scss";

interface Resource {
  id: string;
  title: string;
  description: string;
  resourceUrl: string;
  comments: [];
}

interface PropsResource {
  resource: Resource;
}

// Obtener recurso de Context
const WatchResource: NextPage<PropsResource> = (props: PropsResource) => {
  const { resource } = props;

  console.log('props', resource)
  return (
    <main className={Styles.container}>
      <section>
        <h1>{resource?.title}</h1>
        <div className={Styles.cont_video}>{resource?.resourceUrl}</div>
        <h2>Descripción general:</h2>
        <p>{resource?.description}</p>
      </section>
      <section className={Styles.section_comments}>
        <h2>Comentarios:</h2>
        <div className={Styles.comments}></div>
      </section>
    </main>
  );
};

export default WatchResource;
