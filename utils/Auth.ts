import "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  User as UserFB,
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  UserCredential,
} from "firebase/auth";

import getApp from "../keys/firebase";
import { saveInCollection } from "./DB";

let FacebookProvider = new FacebookAuthProvider();
let GoogleProvider = new GoogleAuthProvider();

const getAuthUser = async () => {
  const res = await getApp();
  // console.log("res:", res);
  return getAuth(res);
};

export const register = async (
  email: string,
  pass: string,
  name: string,
  last_name: string
) => {
  return createUserWithEmailAndPassword(await getAuthUser(), email, pass).then(
    (res) => {
      if (getAdditionalUserInfo(res).isNewUser) saveUser(res, name, last_name);
    }
  );
};

export const login = async (email: string, pass: string) => {
  return signInWithEmailAndPassword(await getAuthUser(), email, pass).catch(
    (err) => {
      window.alert({
        title: "Correo invalido!",
        body: "Ingresa un correo que sea valido.",
        type: "error",
        onConfirm: ()=>{
          location.reload()
        }
      });
    }
  );
};

export const facebookLogin = async () => {
  const auth = await getAuthUser();
  return signInWithPopup(auth, FacebookProvider).then((res) => {
    if (getAdditionalUserInfo(res).isNewUser) saveUser(res);
  });
};

export const googleLogin = async () => {
  const auth = await getAuthUser();
  return signInWithPopup(auth, GoogleProvider)
    .then((res) => {
      if (getAdditionalUserInfo(res).isNewUser) saveUser(res);
    })
    .catch((err) => {
      window.Alert({
        title: "Problemas a ingresar?",
        body: "Intenta recargar la pagina o intentalo de nuevo",
        type: "error",
      });

      console.log("googleLogin-Auth:", err);
    });
};

export const logout = async () => {
  const auth = await getAuthUser();
  window.postMessage({
    action: "logout",
  });
  return auth.signOut();
};

export const userListener = async (callback: (user: UserFB) => unknown) => {
  return onAuthStateChanged(await getAuthUser(), callback);
};

export const saveUser = async (
  cred: UserCredential,
  name?: string,
  last_name?: string
) => {
  const {
    user: { uid, photoURL, displayName },
  } = cred;

  const tmpUser: User = {
    uid,
    name: name ? name : displayName,
    last_name: last_name ? last_name : "",
    photo_url: photoURL,
    state: 0,
    courses_taken: [],
  };
  saveInCollection<User>(tmpUser, uid, "users");
};
