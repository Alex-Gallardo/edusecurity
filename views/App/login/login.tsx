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

  const [ok, setOk] = useState<boolean>(true);
  const [okPass, setOkPass] = useState<boolean>(true);

  // ROUTER
  const router = useRouter();

  // Setear valores (Input)
  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    const expReg =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (name == "email") setOk(expReg.test(value));
    if (name == "pass" && value.length <= 7) {
      setOkPass(false);
    } else if (name === "pass" && value.length > 7) {
      setOkPass(true);
    }

    setState((state) => ({ ...state, [name]: value }));
  };

  // Autenticar
  const authUser = async (e: FormEvent) => {
    e.preventDefault();
    if (!ok) {
      window.Alert({
        title: "Correo inválido",
        body: "Ingresa un correo que sea válido",
        type: "error",
      });
      return;
    }

    if (!okPass) {
      window.Alert({
        title: "Contraseña inválida",
        body: "Ingresa una contraseña que sea válidq",
        type: "error",
      });
      return;
    }

    // TRY
    try {
      let res: any = null;

      if (ok && okPass) {
        res = await login(state.email, state.pass);
      }

      console.log("Login:", res.user);
    } catch (error) {
      // @ts-ignore
      window.Alert({
        title: "Credenciales Invalidas",
        body: "Favor revisar que tu correo y contraseña se encuentren escritas correctamente",
        type: "error",
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
          error={!ok}
          className={Styles.input}
          value={state.email}
          onChange={setValue}
        />
        <TextField
          fullWidth
          name="pass"
          label="Contraseña"
          variant="outlined"
          error={!okPass}
          className={Styles.input}
          value={state.pass}
          onChange={setValue}
          type="password"
        />
        <Button type="submit" variant="contained" className={Styles.input}>
          Iniciar
        </Button>
        <h3>Tambien puedes inciar con:</h3>
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
          {/* <Button className={Styles.btn} onClick={singInFacebook}>
            <div className={Styles.cont_btn_auth}>
              <img
                className={Styles.img}
                width="24px"
                height="24px"
                src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png"
              />
              Facebook
            </div>
          </Button> */}
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
