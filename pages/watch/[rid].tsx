import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// COMPONENTS
import Layout from "../../components/app/Layout/Layout";
import WatchResource from "../../views/App/watch-resource/watchresource";

interface Resource {
  id: string;
  title: string;
  description: string;
  resourceUrl: string;
  comments: [];
}

const resources: Resource[] = [
  {
    id: "watch-video-01",
    title: "3. Seguridad en redes sociales",
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes",
    resourceUrl: "",
    comments: [],
  },
  {
    id: "watch-video-02",
    title: "13. Escaneo de puertos",
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes",
    resourceUrl: "",
    comments: [],
  },
  {
    id: "watch-video-03",
    title: "12. Manejo de metadatos",
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes",
    resourceUrl: "",
    comments: [],
  },
  {
    id: "watch-video-04",
    title: "1. Conceptos basicos",
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes",
    resourceUrl: "",
    comments: [],
  },
];
const Init = () => {
  const [state, setState] = useState<any>(false);
  const router = useRouter();
  const {
    query: { rid },
  } = router;

  let resource;

  useEffect(() => {
    resource = resources.find((res: Resource) => res.id === rid);
    setState({ ...resource });
    console.log("RES", resource);
  }, [rid]);

  return (
    <>
      <Layout>{state ? <WatchResource resource={state}></WatchResource> : ""}</Layout>
    </>
  );
};

export default Init;
