import React, { FormEvent, useState } from "react";
import { login } from "../../../utils/Auth";
import { facebookLogin, googleLogin } from "../../../utils/Auth";

// STYLES
import Styles from "./login.module.scss";

// @material
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface PropsLogin {
  sendToRegister: () => unknown;
}

const Login = (props: PropsLogin) => {
  const [state, setState] = useState<{ email: string; pass: string }>({
    email: "",
    pass: "",
  });

  // Setear valores (Input)
  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setState((state) => ({ ...state, [name]: value }));
  };

  // Autenticar
  const authUser = async (e: FormEvent) => {
    e.preventDefault();
    try{
      const res = await login(state.email, state.pass);
    console.log("Login:", res.user);
      
    }catch(error){ 
      // @ts-ignore
      window.Alert({
        title:"Credenciales Invalidas",
        body:"Favor revisar que tu correo y contraseña se encuentren escritas correctamente",
        type:"confirm",
        onConfirm:()=>{
          setState({email:"",pass:""})
        }
      })
    };
      
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
    <main className={Styles.main} onSubmit={authUser}>
      <form className={Styles.info}>
        <h1>Inicia sesion</h1>
        <TextField
          name="email"
          label="Correo"
          variant="outlined"
          value={state.email}
          onChange={setValue}
        />
        <TextField
          name="pass"
          label="Contraseña"
          variant="outlined"
          value={state.pass}
          onChange={setValue}
          type="password"
        />
        <Button type="submit" variant="contained">
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
          <p onClick={props.sendToRegister}>No tienes una cuenta?</p>
        </div>
      </form>
    </main>
  );
};

export default Login;
