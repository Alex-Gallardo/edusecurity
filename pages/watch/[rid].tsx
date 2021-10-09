import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// COMPONENTS
import Layout from "../../components/app/Layout/Layout";
import WatchResource from "../../views/App/watch-resource/watchresource";
import { getFromCollection } from "./../../utils/DB";

const Init = () => {
  const [resource, setResource] = useState<Resource | null>(null);
  const router = useRouter();
  const {
    query: { rid },
  } = router;

  useEffect(() => {
    // @ts-ignore
    getFromCollection<Resource>(rid, "Resources").then((res) => {
      setResource(res);
    });
  }, [rid]);

  return (
    <>
      <Layout>
        {resource ? <WatchResource resource={resource}></WatchResource> : ""}
      </Layout>
    </>
  );
};

export default Init;
