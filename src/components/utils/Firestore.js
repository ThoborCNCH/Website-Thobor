import { initializeApp } from "firebase/app";
import "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

export default class Firestore {

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain:  process.env.REACT_APP_AUTHDOMAIN,
      projectId: process.env.REACT_APP_PROJECTID,
      storageBucket: process.env.REACT_APP_STORAGEBUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
      appId: process.env.REACT_APP_APPID,
      measurementId: process.env.REACT_APP_MEASUREMENTID
    };

    const app = initializeApp(firebaseConfig);
    this.storage = getStorage(app);
    this.db = getFirestore(app);
  }

  getDb() {
    return this.db;
  }

  getSt() {
    return this.storage;
  }

  async readCosmin() {
    const q = query(
      collection(this.db, "categories"),
      limit(2),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);
    const documents = [];

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  }

  async sortdata(collectionName, by, how) {
    const q = query(collection(this.db, collectionName), orderBy(by, how));

    const querySnapshot = await getDocs(q);
    const documents = [];

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  }

  async readDocuments(collectionName, condition, limitare) {
    let q;

    if (condition === undefined || condition[2] === "all") {
      q = query(collection(this.db, collectionName));
    } else if (
      condition !== undefined &&
      limitare === undefined &&
      typeof condition[2] !== "number" &&
      condition[2].includes("search")
    ) {
      q = query(collection(this.db, collectionName));
    } else if (limitare === undefined) {
      q = query(
        collection(this.db, collectionName),
        where(condition[0], condition[1], condition[2])
      );
    } else {
      q = query(
        collection(this.db, collectionName),
        where(condition[0], condition[1], condition[2]),
        limit(limitare),
        orderBy("rating", "desc")
      );
    }
    const querySnapshot = await getDocs(q);
    const documents = [];
    if (
      condition !== undefined &&
      typeof condition[2] !== "number" &&
      condition[2].includes("search")
    ) {
      condition[2] = condition[2].slice(6);
      querySnapshot.forEach((doc) => {
        if (doc.get("nume").includes(condition[2])) {
          documents.push({ id: doc.id, ...doc.data() });
        }
      });
    } else {
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
    }

    return documents;
  }

  async getDocById(col, productId) {
    const docRef = doc(this.db, col, productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  }
  toTimestamp = (strDate) => {
    const dt = new Date(strDate).getTime();
    return dt / 1000;
  };

  async updateDocument(collectionName, documentId, data) {
    const ref = doc(this.db, collectionName, documentId);
    return await updateDoc(ref, data);
  }
}

