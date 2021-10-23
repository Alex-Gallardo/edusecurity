import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";

// UTILS
import { login } from "utils/Auth";
import { facebookLogin, googleLogin } from "utils/Auth";

// @material
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// STYLES
import Styles from "./login.module.scss";

const Login = () => {
  const [state, setState] = useState<{ email: string; pass: string }>({
    email: "",
    pass: "",
  });

  // ROUTER
  const router = useRouter();

  // Setear valores (Input)
  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setState((state) => ({ ...state, [name]: value }));
  };

  // Autenticar
  const authUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(state.email, state.pass);
      console.log("Login:", res.user);
    } catch (error) {
      // @ts-ignore
      window.Alert({
        title: "Credenciales Invalidas",
        body: "Favor revisar que tu correo y contraseña se encuentren escritas correctamente",
        type: "confirm",
        onConfirm: () => {
          setState({ email: "", pass: "" });
        },
      });
    }
  };

  // Ingresar con facebook
  const singInFacebook = () => {
    facebookLogin();
  };

  // Ingresar con Google
  const singInGoogle = () => {
    googleLogin();
  };

  // ENVIAR A REGISTER
  const sendToRegister = () => {
    router.push("/register");
  };

  return (
    <main className={Styles.main} onSubmit={authUser}>
      <form className={Styles.info}>
        <h1>Inicia sesion</h1>
        <TextField
          fullWidth
          name="email"
          label="Correo"
          variant="outlined"
          className={Styles.input}
          value={state.email}
          onChange={setValue}
        />
        <TextField
          fullWidth
          name="pass"
          label="Contraseña"
          variant="outlined"
          className={Styles.input}
          value={state.pass}
          onChange={setValue}
          type="password"
        />
        <Button type="submit" variant="contained" className={Styles.input}>
          Iniciar
        </Button>
        <h3>O</h3>
        <div className={Styles.cont_register}>
          <Button className={Styles.btn} onClick={singInGoogle}>
            <div className={Styles.cont_btn_auth}>
              <img
                className={Styles.img}
                width="24px"
                height="24px"
                src="https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png"
              />
              Google
            </div>
          </Button>
          <Button className={Styles.btn} onClick={singInFacebook}>
            <div className={Styles.cont_btn_auth}>
              <img
                className={Styles.img}
                width="24px"
                height="24px"
                src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png"
              />
              Facebook
            </div>
          </Button>
        </div>
      </form>
      <Button
        onClick={sendToRegister}
        variant="contained"
        style={{ marginTop: "32px" }}
      >
        No tienes una cuenta?
      </Button>
    </main>
  );
};

export default Login;
