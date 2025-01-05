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
      apiKey: "AIzaSyCKqEFo6ub9S9qZvbkfIibZFQidAAuB0xo",
      authDomain: "thobor-website.firebaseapp.com",
      projectId: "thobor-website",
      storageBucket: "thobor-website.appspot.com",
      messagingSenderId: "808117020888",
      appId: "1:808117020888:web:4d3e1a2689c24b06a98fad",
      measurementId: "G-RKP2Z9D18B"
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

