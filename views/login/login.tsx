import React, { FormEvent, useState } from "react";
import { login } from "../../utils/Auth";

// STYLES
import Styles from "./login.module.scss";

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
    const res = await login(state.email, state.pass);
    console.log("Login:", res.user);
  };

  return (
    <main className={Styles.main} onSubmit={authUser}>
      <form className={Styles.info}>
        <h2>User</h2>
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
        <div className={Styles.cont_register}>
          <p onClick={props.sendToRegister}>No tienes una cuenta?</p>
        </div>
      </form>
    </main>
  );
};

export default Login;
