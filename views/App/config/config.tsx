import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext";
import Image from "next/image";

// STYLES
import Styles from "./config.module.scss";

// ROUTER
import { useRouter } from "next/router";

// @MATERIAL
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// MODELS
// import { User } from "../../../Models/User";

// UTILS
import { logout } from "utils/Auth";
import { saveInCollection } from "utils/DB";
import { addToStorage, getURLFromStorage } from "utils/Storage";

const Config = () => {
  // CONTEXT
  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  // ESTADO
  const [state, setState] = useState<User>(user);
  const [imgProfile, setImgProfile] = useState<string>(
    user?.photo_url ||
      "https://erasmuscoursescroatia.com/wp-content/uploads/2015/11/no-user.jpg"
  );

  // ROUTER
  const router = useRouter();

  useEffect(() => {
    if (user) setImgProfile(user.photo_url);
  }, [user]);

  // Setear valores (Input)
  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setState((state) => ({ ...state, [name]: value }));
  };

  // CERRAR SESSION
  const logOut = () => {
    // @ts-ignore
    window.Alert({
      title: "Cierre de sesion",
      body: "Seguro que quieres salir de esta cuenta",
      type: "confirm",
      onConfirm: () => {
        logout().then(() => router.push("/login"));
      },
    });
  };

  // ACTUALIZAR DATOS USER
  const actDatUser = () => {
    try {
      // @ts-ignore
      window.Alert({
        title: "Actualizar datos",
        body: "Seguro que quieres actualizar tus datos?",
        type: "confirm",
        onConfirm: () => {
          saveInCollection<User>(state, state.uid, "users", true)
            .then((_res) => {
              window.Alert({
                title: "Actualizacion completa!",
                body: "Tus datos han sido actualizados",
                type: "confirm",
                onConfirm: () => location.reload(),
              });
            })
            .catch((err) => {
              window.Alert({
                title: "Upss ocurrio un error",
                body: "Hubo un problema al actualizar tus datos, recarga la pagina o intentalo mas tarde",
                type: "error",
              });
              console.error("updateUser-config-actDatuser:", err);
            });
        },
      });
    } catch (error) {
      console.error("Error de actualizacion de datos", error);
    }
  };

  // COMPUTAR STORAGE-FIREBASE
  const computeImg = (value: any) => {
    const files = value.target.files;
    console.log("file-input", files, files[0].name);

    addToStorage("Profiles", files[0].name, files[0])
      .then((_res) => {
        getURLFromStorage("Profiles", files[0].name).then((r) => {
          console.log("Respuesta:", _res, r);
          const tmpU: User = state ? state : user;
          tmpU.photo_url = r;
          setImgProfile(r);
          setState(tmpU);
          // @ts-ignore
          window.Alert({
            title: "Accion completada",
            body: `La imagen "${files[0].name}" se ha subido correctamente!`,
            type: "confirm",
          });
        });
      })
      .catch((err) => {
        // @ts-ignore
        window.Alert({
          title: "Uppss, a ocurrido un error!",
          body: "Hubo un error en la subida de la imagen, intenta recargar la pagina e intentalo de nuevo",
          type: "error",
        });
        console.error("uploadImage-config-computeImg", err);
      });
  };

  return (
    <main className={Styles.container}>
      <div
        className={Styles.bac_box}
        style={{
          backgroundColor: user && user.state === 1 ? "#A800FF" : "#07355f",
        }}
      />

      {/* PERFIL INFO */}
      <section className={Styles.body_}>
        <label htmlFor="user_image" className={Styles.cont_img}>
          <Image
            src={imgProfile}
            alt="picture-perfil"
            className={Styles.body_img}
            unoptimized
            width="200px"
            height="200px"
          />
        </label>
        <input
          id="user_image"
          accept="image/png,image/jpg"
          type="file"
          multiple={false}
          style={{ display: "none" }}
          onChange={(e: any) => computeImg(e)}
        />

        {/* DAT-PERFIL */}
        <div className={Styles.perfil}>
          <h2>
            {user?.name} {user?.last_name}
          </h2>
          <p>{user?.state === 0 ? "Estudiante" : "Maestro"}</p>
        </div>

        {/* CURSOS TOMADOS */}
        <section className={Styles.info}>
          <div className={Styles.cont_info}>
            <h3>Cursos tomados:</h3>
            <p>{state?.courses_taken?.length || 0}</p>
          </div>
          {user?.state === 0 ? (
            ""
          ) : (
            <div className={Styles.cont_info}>
              <h3>Cursos subidos:</h3>
              <p>{state?.courses_id?.length || 0}</p>
            </div>
          )}
        </section>

        {/* CERRAR SESION */}
        <Button variant="contained" color="secondary" onClick={logOut}>
          Cerrar Sesion
        </Button>
        <hr />
        <section className={Styles.cont_data}>
          <h2>Actualiza tu información</h2>
          <TextField
            name="name"
            label="Nombre"
            variant="outlined"
            value={state?.name}
            className={Styles.input_data}
            onChange={setValue}
          ></TextField>
          <TextField
            name="last_name"
            label="Apellido"
            variant="outlined"
            value={state?.last_name}
            className={Styles.input_data}
            onChange={setValue}
          ></TextField>
          <Button variant="contained" color="primary" onClick={actDatUser}>
            Guardar
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Config;
