import getFirebase from "keys/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";

export const addToStorage = async (
  directory: string,
  name: string,
  file: Blob | File
) => {
  // STORAGE
  const firebaseApp = await getFirebase();
  const str = getStorage(firebaseApp);
  const refName: string = `/${directory}/${name}`;
  const refs = ref(str, refName);

  // AGREGAR
  return uploadBytes(refs, file);
};

export const removeFromStorage = async (directory: string, name: string) => {
  // STORAGE
  const firebaseApp = await getFirebase();
  const str = getStorage(firebaseApp);
  const refName: string = `/${directory}/${name}`;
  const refs = ref(str, refName);

  // AGREGAR
  return deleteObject(refs);
};

export const getURLFromStorage = async (directory: string, name: string) => {
  const firebaseApp = await getFirebase();
  const str = getStorage(firebaseApp);
  const refName: string = `/${directory}/${name}`;
  const refs = ref(str, refName);
  return getDownloadURL(refs);
};

const getRef = async (path: string) => {
  const { getStorage, ref } = await import("firebase/storage");

  // STORAGE
  const firebaseApp = await getFirebase();
  const str = getStorage(firebaseApp);
  const refs = ref(str, path);

  return refs;
};

export const getURL = async (path: string): Promise<string> => {
  const { getDownloadURL } = await import("firebase/storage");

  // STORAGE
  const refs = await getRef(path);

  // LISTA
  const url = await getDownloadURL(refs);
  return url;
};
