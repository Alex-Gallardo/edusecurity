import React, { FormEvent, useState } from "react";
import Styles from "./register.module.scss";

// UTILS
import { facebookLogin, register } from "../../utils/Auth";
import { googleLogin } from "./../../utils/Auth";

const Register = () => {
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
  const authUser = (e: FormEvent) => {
    e.preventDefault();
    const res = register(state.email, state.pass);
    console.log("Register:", res);
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
        <h2>Email</h2>
        <input
          width="100%"
          name="email"
          value={state.email}
          onChange={setValue}
        />
        <h2>Password</h2>
        <input
          width="100%"
          name="pass"
          value={state.pass}
          onChange={setValue}
        />
        <button type="submit">Enviar</button>
        <h1>Ó</h1>
        <div className={Styles.cont_register}>
          <div onClick={singInFacebook}>
            <img
              width="50px"
              height="50px"
              src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png"
            />
          </div>
          <div onClick={singInGoogle}>
            <img
              width="50px"
              height="50px"
              src="https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png"
            />
          </div>
        </div>
      </form>
    </main>
  );
};

export default Register;
