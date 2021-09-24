import React, { useEffect } from "react";
import { useRouter } from "next/router";

// STYLES
import "../styles/globals.scss";

// PROVIDER
import UserProvider from "../context/UserProvider";
import { userListener } from "./../utils/Auth";

function MyApp({ Component, pageProps }) {
  // ROUTER
  const router = useRouter();

  useEffect(() => {
    let listener;

    // **Transforma una funcion asincrona a sincrona
    (async () =>
      (listener = await userListener((user) => {
        if (user) {
          if (!router.pathname.startsWith("/watch") && !router.pathname.startsWith("/admin")) router.push("/");
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
