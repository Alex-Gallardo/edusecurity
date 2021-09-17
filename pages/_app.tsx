import React from "react";

// STYLES
import "../styles/globals.scss";

// PROVIDER
import UserProvider from "../context/UserProvider";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
