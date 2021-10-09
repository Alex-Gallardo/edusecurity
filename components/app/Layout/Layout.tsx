import React from "react";

// NEXT-HEAD
import Head from "next/head";

// CONPONENTS
import Header from "../Header/Header";

// STYLES
import Styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={Styles.container}>
      {/* HEAD */}
      <Head>
        <title>EduSecurity</title>
      </Head>
      <Header />
      <main className={Styles.sub_container}>{children}</main>
    </div>
  );
};

export default Layout;
