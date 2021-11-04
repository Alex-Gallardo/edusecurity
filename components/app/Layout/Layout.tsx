import React from "react";

// NEXT-HEAD
import Head from "next/head";

// CONPONENTS
import Header from "../Header/Header";

// STYLES
import Styles from "./Layout.module.scss";

// PROPS
interface LayoutProps {
  children: any,
  onSearch?: any
}

const Layout = ({ children, onSearch }: LayoutProps) => {
  return (
    <div className={Styles.container}>
      {/* HEAD */}
      <Head>
        <title>EduSecurity</title>
      </Head>
      <Header onSearch={onSearch} />
      <main className={Styles.sub_container}>{children}</main>
    </div>
  );
};

export default Layout;
