import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
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

export default class Firestore {
  constructor() {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_APIKEY,
      authDomain: process.env.REACT_APP_AUTHDOMAIN,
      projectId: process.env.REACT_APP_PROJECTID,
      storageBucket: process.env.REACT_APP_STORAGEBUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
      appId: process.env.REACT_APP_APPID,
    };

    const app = initializeApp(firebaseConfig);
    this.db = getFirestore();
    this.auth = getAuth(app);
    this.googleProvider = new GoogleAuthProvider();
  }

  getDb() {
    return this.db;
  }

  async logout() {
    await signOut(this.auth);
  }

  getuser() {
    return this.auth;
  }

  async readCosmin() {
    let q = query(
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

  async getProductByUser(user) {
    let cant = [];
    let total = 0;
    if (user) {
      await this.readDocuments("cos", ["user_id", "==", user.uid]).then(
        (res) => {
          for (let i = 0; i < res.length; i++) {
            cant.push({
              uid: res[i].id,
              id: res[i].id_produs,
              cant: res[i].cantitate,
            });
          }
        }
      );

      for (let i = 0; i < cant.length; i++) {
        cant[i] = {
          uid: cant[i].uid,
          cant: cant[i].cant,
          ...(await this.getProductById(cant[i].id)),
        };
        total += cant[i].cant * cant[i].pret;
      }
    }
    return { cant, total };
  }

  async addit(id, user, cant) {
    if (user)
      await this.updateProductCos({
        id_produs: id,
        cantitate: cant,
        user_id: user.uid,
      }).then((res) => {
        if (res === "adaug") alert("Adaugat cu succes in cos!");
        else if (res === "update ok") alert("Update cantitate");
        else alert("eroare");
      });
    else {
      alert("nu e logat");
    }
  }

  async getCos(user) {
    let cant = 0;
    if (user) {
      await this.readDocuments("cos", ["user_id", "==", user.uid]).then(
        (res) => {
          for (let i = 0; i < res.length; i++) {
            cant += res[i].cantitate;
          }
        }
      );
    }
    return cant;
  }

  async signInWithGoogle() {
    try {
      const res = await signInWithPopup(this.auth, this.googleProvider);
      const user = res.user;
      const q = query(
        collection(this.db, "users"),
        where("uid", "==", user.uid)
      );
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(this.db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async addItem(collectionName, product) {
    const db = getFirestore();
    const productsRef = collection(db, collectionName);

    return await addDoc(productsRef, product).then((docRef) => {
      return { id: docRef.id, ...product };
    });
  }

  async updateProductCos(product) {
    const db = getFirestore();
    const productsRef = collection(db, "cos");

    const q = query(
      productsRef,
      where("id_produs", "==", product.id_produs),
      where("user_id", "==", product.user_id)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size !== 1) {
      await addDoc(productsRef, product).then((docRef) => {
        return "adaug";
      });
      return "adaug";
    }

    const productDoc = querySnapshot.docs[0];
    const productRef = doc(db, "cos", productDoc.id);

    try {
      await updateDoc(productRef, {
        cantitate: productDoc.get("cantitate") + product.cantitate,
      });
      return "update ok";
    } catch (error) {
      return false;
    }
  }

  async sortdata(collectionName, by, how) {
    let q = query(collection(this.db, collectionName), orderBy(by, how));

    const querySnapshot = await getDocs(q);
    const documents = [];

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  }

  async getReducere() {
    return await this.readDocuments("products", ["old_pret", ">", 0]);
  }

  async filter(products, filterss) {
    let arr = products;

    const filters = filterss.reduce((acc, curr) => {
      return [...acc, ...Object.values(curr)];
    }, []);

    for (let i = 0; i < filters.length; i++) {
      let filter = filters[i];
      for (let j = 0; j < filter.length; j++) {
        switch (filter[j][1]) {
          case ">=":
            arr = arr.filter((a) => a[filter[j][0]] >= filter[j][2]);
            break;
          case "<=":
            arr = arr.filter((a) => a[filter[j][0]] <= filter[j][2]);
            break;
          case ">":
            arr = arr.filter((a) => a[filter[j][0]] > filter[j][2]);
            break;
          case "<":
            arr = arr.filter((a) => a[filter[j][0]] < filter[j][2]);
            break;

          case "==":
            arr = arr.filter((a) => a[filter[j][0]] == filter[j][2]);
            break;
        }
      }
    }

    if (filters.length == 0) return false;
    return arr;
  }

  async readDocuments(collectionName, condition, limitare) {
    let q;

    if (condition == undefined || condition[2] === "all") {
      q = query(collection(this.db, collectionName));
    } else if (
      condition !== undefined &&
      limitare == undefined &&
      typeof condition[2] !== "number" &&
      condition[2].includes("search")
    ) {
      q = query(collection(this.db, collectionName));
    } else if (limitare == undefined) {
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
  async updateDocument(collectionName, documentId, data) {
    const ref = doc(this.db, collectionName, documentId);
    return await updateDoc(ref, data);
  }
  async getProductById(productId) {
    const docRef = doc(this.db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  }
  async leaveRev(id, rev) {
    let prod = await this.getProductById(id);
    let reviews = [...prod.reviews, { ...rev }];
    prod.reviews = reviews;
    let rating = prod.rating;
    let newRating = 0;
    if (rating == 0) {
      newRating = rev.rating;
    } else {
      for (let i = 0; i < reviews.length; i++) {
        newRating += reviews[i].rating;
      }
      newRating /= reviews.length;
    }
    prod.rating = newRating;

    return await this.updateDocument("products", id, prod);
  }

  async deleteRev(revi) {
    const { date, rating, review, user } = revi.rev;
    const id = revi.id;

    const prod = await this.getProductById(id);
    let { reviews } = prod;
    let index = 0;
    let newRating = 0;
    prod.reviews.forEach((rev, i, object) => {
      if (
        rev.date == date &&
        rev.rating == rating &&
        rev.review == review &&
        rev.user.id == user.id &&
        rev.user.email == user.email &&
        rev.user.nume == user.nume
      ) {
        index = i;
        for (let i = 0; i < reviews.length; i++) {
          if (i != index) {
            newRating += reviews[i].rating;
          }
        }
        newRating /= reviews.length - 1;
      }
    });
    reviews.splice(index, 1);
    prod.rating = newRating;
    prod.reviews = reviews;
    return await this.updateDocument("products", id, prod);
  }

  async deleteDocument(collectionName, documentId) {
    await deleteDoc(doc(this.db, collectionName, documentId));
  }

  async delete_all_from_cart(id) {
    const carts = await this.readDocuments("cos", ["id_produs", "==", id]);
    for (const cart of carts) {
      await this.deleteDocument("cos", cart.id);
    }
  }

  async delete_all_from_cart_by_user_id(id) {
    const carts = await this.readDocuments("cos", ["user_id", "==", id]);
    for (const cart of carts) {
      await this.deleteDocument("cos", cart.id);
    }
  }
}
