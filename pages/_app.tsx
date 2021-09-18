import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// STYLES
import "../styles/globals.scss";

// PROVIDER
import UserProvider from "../context/UserProvider";
import { userListener } from "./../utils/Auth";
import useAuthContext from "../hooks/useAuthContext";

function MyApp({ Component, pageProps }) {
  // ROUTER
  const router = useRouter();

  useEffect(() => {
    let listener;

    // **Transforma una funcion asincrona a sincrona
    (async () =>
      (listener = await userListener((user) => {
        if (user) {
          router.push("/");
        } else {
          router.push("/login");
        }
      })))();

    return () => {
      listener();
    };
  }, []);

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
