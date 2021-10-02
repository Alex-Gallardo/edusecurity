import React from "react";

// VIEWS
import Foro from "views/App/Foro/Foro";

// COMPONENTS
import Layout from "components/app/Layout/Layout";

const Init = () => {
  return (
    <>
      <Layout>
        <Foro />
      </Layout>
    </>
  );
};

export default Init;
