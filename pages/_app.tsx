import React, { useEffect } from "react";
import { useRouter } from "next/router";

// STYLES
import "../styles/globals.scss";

// PROVIDER
import UserProvider from "../context/UserProvider";
import { userListener } from "./../utils/Auth";

// NEXT
import AlertTemplate from "components/app/lualert";

function MyApp({ Component, pageProps }) {
  // ROUTER
  const router = useRouter();

  useEffect(() => {
    let listener;

    // **Transforma una funcion asincrona a sincrona
    (async () =>
      (listener = await userListener((user) => {
        if (user) {
          if (
            !router.pathname.startsWith("/watch") &&
            !router.pathname.startsWith("/admin")
          )
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
      <AlertTemplate
        blurred
        zIndex={100}
        confirmColor="#1AA5BB"
        cancelText="Cancelar"
        confirmText="Aceptar"
      />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
