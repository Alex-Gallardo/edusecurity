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
  return signInWithEmailAndPassword(await getAuthUser(), email, pass);
};

export const facebookLogin = async () => {
  const auth = await getAuthUser();
  return signInWithPopup(auth, FacebookProvider).then((res) => {
    if (getAdditionalUserInfo(res).isNewUser) saveUser(res);
  });
};

export const googleLogin = async () => {
  const auth = await getAuthUser();
  return signInWithPopup(auth, GoogleProvider).then((res) => {
    if (getAdditionalUserInfo(res).isNewUser) saveUser(res);
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
