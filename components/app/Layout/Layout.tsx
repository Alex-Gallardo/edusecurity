import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../Header/Header";

// Styles
import Styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  const path = useRouter().pathname;

  return (
    <>
      <Head>
        <title>EduSecurity</title>
      </Head>
      {path === "/login" || path === "/nuevacuenta" ? (
        <div className={Styles.container}>{children}</div>
      ) : (
        <div className={Styles.container}>
          <Header></Header>
          <main className={Styles.main}>{children}</main>
        </div>
      )}
    </>
  );
};

export default Layout;
