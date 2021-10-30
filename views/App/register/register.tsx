import React, { FormEvent, useState } from "react";

// UTILS
import { facebookLogin, register, googleLogin } from "utils/Auth";

// @MATERIAL
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// STYLES
import Styles from "./register.module.scss";

interface UserAuth {
  email: string;
  pass: string;
  name: string;
  last_name: string;
}

const Register = () => {
  const [ok, setOk] = useState<boolean>(true);
  const [okPass, setOkPass] = useState<boolean>(true);
  const [state, setState] = useState<UserAuth>({
    email: "",
    pass: "",
    name: "",
    last_name: "",
  });

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
  const authUser = (e: FormEvent) => {
    e.preventDefault();

    if (!ok) {
      window.Alert({
        title: "Correo inválido",
        body: "Ingresa un correo que sea válido",
        type: "error",
      });
    }

    if (!okPass) {
      window.Alert({
        title: "Contraseña inválida",
        body: "Ingresa una contraseña que sea válidq",
        type: "error",
      });
    }

    if (state.name.length > 0 && state.last_name.length > 0) {
      // TRY
      try {
        let res: any = null;
        if (ok && okPass) {
          res = register(state.email, state.pass, state.name, state.last_name);
        } else {
          window.Alert({
            title: "Credenciales Invalidas",
            body: "Favor revisar complete los campos correctamente",
            type: "error",
            onConfirm: () => {
              setState({ email: "", pass: "", name: "", last_name: "" });
            },
          });
        }

        console.log("Register:", res);
      } catch (error) {
        window.Alert({
          title: "Credenciales Invalidas",
          body: "Favor revisar que tu correo y contraseña se encuentren escritas correctamente",
          type: "error",
          onConfirm: () => {
            setState({ email: "", pass: "", name: "", last_name: "" });
          },
        });
      }
    } else {
      window.Alert({
        title: "Credenciales Invalidas",
        body: "Favor revisar que tus campos se encuentres completos!",
        type: "error",
        onConfirm: () => {
          setState({ email: "", pass: "", name: "", last_name: "" });
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

  return (
    <main className={Styles.main}>
      <form className={Styles.info} onSubmit={authUser}>
        <h1>Registrate</h1>
        <TextField
          fullWidth
          name="name"
          label="Nombre"
          variant="outlined"
          value={state.name}
          onChange={setValue}
        />
        <TextField
          fullWidth
          name="last_name"
          label="Apellido"
          variant="outlined"
          value={state.last_name}
          onChange={setValue}
        />
        <TextField
          fullWidth
          name="email"
          label="Correo"
          variant="outlined"
          error={!ok}
          value={state.email}
          onChange={setValue}
        />
        <TextField
          fullWidth
          name="pass"
          label="Contraseña"
          type="password"
          variant="outlined"
          error={!okPass}
          value={state.pass}
          onChange={setValue}
        />
        <Button type="submit" variant="contained">
          Enviar
        </Button>
        <h3>ó tambien puedes registrarte con:</h3>
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
    </main>
  );
};

export default Register;
