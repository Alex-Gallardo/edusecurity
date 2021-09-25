// UTILS
import getApp from "keys/firebase";
import {
  CollectionReference,
  DocumentData,
  Firestore,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  onSnapshot,
  DocumentSnapshot,
  FirestoreError,
  Unsubscribe,
  DocumentReference,
  getDocs,
  PartialWithFieldValue
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
  globalDB = globalDB ?? getFirestore(firebaseApp);

  // COLECCIÓN
  return collection(globalDB, colName);
};

export const saveInCollection = async <T>(
  data: PartialWithFieldValue<T>,
  dataId: string,
  colName: string,
  merge = false
) => {
  const collection = await getCollection(colName);
  const colDoc = doc(collection, dataId) as DocumentReference<T>;
  return setDoc(colDoc, data, { merge });
};

export const getFromCollection = async <T>(dataId: string, colName: string) => {
  const collection = await getCollection(colName);
  const colDoc = doc(collection, dataId);
  const refDoc = await getDoc(colDoc);
  return refDoc.data() as T;
};

export const getAllFromCollection = async<T>(colName:string) => {
  const collection = await getCollection(colName);
  const docsRef = await getDocs(collection)
  const docsData = docsRef.docs.map((doc) => doc.data()) as T[]
  return docsData
}

export const getListener = async <T>(
  dataId: string,
  colName: string,
  onNext: (snapshot: DocumentSnapshot<T>) => void,
  onError?: (error: FirestoreError) => void,
  onCompletion?: () => void
) => {
  const collection = await getCollection(colName);
  const colDoc = doc(collection, dataId);
  return onSnapshot(colDoc, onNext, onError, onCompletion);
};

export const deleteFromCollection = async (dataId: string, colName: string) => {
  const collection = await getCollection(colName);
  const colDoc = doc(collection, dataId);
  return deleteDoc(colDoc);
};
