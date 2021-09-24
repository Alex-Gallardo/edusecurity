import "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  User,
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAdditionalUserInfo
} from "firebase/auth";

import getApp from "../keys/firebase";

let FacebookProvider = new FacebookAuthProvider();
let GoogleProvider = new GoogleAuthProvider();

const getAuthUser = async () => {
  const res = await getApp();
  // console.log("res:", res);
  return getAuth(res);
};

export const register = async (email: string, pass: string) => {
  return createUserWithEmailAndPassword(await getAuthUser(), email, pass).then(
    res => {
      if (getAdditionalUserInfo(res).isNewUser) saveUser();
    }
  );
};

export const login = async (email: string, pass: string) => {
  return signInWithEmailAndPassword(await getAuthUser(), email, pass);
};

export const facebookLogin = async () => {
  const auth = await getAuthUser();
  return signInWithPopup(auth, FacebookProvider).then(res => {
    if (getAdditionalUserInfo(res).isNewUser) saveUser();
  });
};

export const googleLogin = async () => {
  const auth = await getAuthUser();
  return signInWithPopup(auth, GoogleProvider).then(res => {
    if (getAdditionalUserInfo(res).isNewUser) saveUser();
  });
};

export const userListener = async (callback: (user: User) => unknown) => {
  return onAuthStateChanged(await getAuthUser(), callback);
};
