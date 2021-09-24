// UTILS
import getApp from "keys/firebase";
import {
  CollectionReference,
  DocumentData,
  Firestore,
  doc,
  setDoc,
  deleteDoc,
  getDoc
} from "firebase/firestore";

// GLOBALES
let globalDB: Firestore | null = null;

/**
 * Obtener colección
 * @param  {string} colName
 * @description Retorna la collection en firestore con el nombre
 */
export const getCollection = async (
  colName: string
): Promise<CollectionReference<DocumentData>> => {
  const { collection, getFirestore } = await import("firebase/firestore");

  // DATABASE
  const firebaseApp = await getApp();
  const db = globalDB ?? getFirestore(firebaseApp);

  // COLECCIÓN
  return collection(db, colName);
};

export const saveInCollection = async (
  data: unknown,
  dataId: string,
  colName: string,
  merge = false
) => {
  const collection = await getCollection(colName);
  const colDoc = doc(collection, dataId);
  return setDoc(colDoc, data, { merge });
};

export const deleteFromCollection = async (dataId: string, colName: string) => {
  const collection = await getCollection(colName);
  const colDoc = doc(collection, dataId);
  return deleteDoc(colDoc);
};

export const getFromCollection = async (dataId: string, colName: string) => {
  const collection = await getCollection(colName);
  const colDoc = doc(collection, dataId);
  const refDoc = await getDoc(colDoc);
  return refDoc.data();
};
