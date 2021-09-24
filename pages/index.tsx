import React from "react";
// STYLES
import styles from "./index.module.scss";
// COMPONENTS
import Layout from "../components/app/Layout/Layout";
// VIEWS
import Home from "../views/App/home/home";

const Init = () => {
  return (
    <div className={styles.container}>
      <Layout>
        <Home></Home>
      </Layout>
    </div>
  );
};

export default Init;
