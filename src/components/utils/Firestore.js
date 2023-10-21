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
  Timestamp,
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
      apiKey: "AIzaSyBukGVQdvZI-vlAlrKJSLcr1YVzN5bo6O8",
      authDomain: "thobor-test.firebaseapp.com",
      projectId: "thobor-test",
      storageBucket: "thobor-test.appspot.com",
      messagingSenderId: "1009659565897",
      appId: "1:1009659565897:web:45da398e7381650a9b2c98",
      measurementId: "G-EQN62L03G9"
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

  async getProductByUser(user) {
    const cant = [];
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
        else if (res === "update found") alert("Update cantitate");
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
      return "update found";
    } catch (error) {
      return false;
    }
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
  toTimestamp = (strDate) => {
    const dt = new Date(strDate).getTime();
    return dt / 1000;
  };
  // async ad() {
  //   const posts = await this.readDocuments("blog");
  //   console.log(posts);
  //   posts.map(async (post) => {
  //     if (
  //       post.id != "m7nULuJl94q5e94gpc3M" ||
  //       post.id != "eHGD89xwA1JYuP6m7HQI"
  //     ) {
  //       post.views = [];
  //       await this.updateDocument("blog", post.id, post);
  //     }
  //   });
  // }

  async updateViews(id, ip) {
    if (id) {
      let post = {};
      this.getDocById("blog", id).then((res) => {
        post = res;
        let found = false;
        post.views.map((view) => {
          if (view.ip == ip) {
            found = true;
          }
        });
        if (!found) {
          post.views.push({
            ip: ip,
            data: Timestamp.now(),
          });
          this.updateDocument("blog", id, post).then((res) => {
            console.log("updated views");
          });
        } else {
          // post.views = [
          //     {
          //       ip: "192.168.0.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-01-02T00:00:00")),
          //     },
          //     {
          //       ip: "10.0.0.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-03-15T12:30:45")),
          //     },
          //     {
          //       ip: "172.16.0.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-07-10T08:15:30")),
          //     },
          //     {
          //       ip: "192.0.2.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-05-20T17:45:00")),
          //     },
          //     {
          //       ip: "198.51.100.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-11-07T22:10:15")),
          //     },
          //     {
          //       ip: "203.0.113.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-06-03T03:20:30")),
          //     },
          //     {
          //       ip: "192.168.1.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-09-18T16:55:00")),
          //     },
          //     {
          //       ip: "10.0.0.2",
          //       data: Timestamp.fromMillis(Date.parse("2023-02-14T08:30:45")),
          //     },
          //     {
          //       ip: "172.16.0.2",
          //       data: Timestamp.fromMillis(Date.parse("2023-07-25T21:45:30")),
          //     },
          //     {
          //       ip: "192.0.2.2",
          //       data: Timestamp.fromMillis(Date.parse("2023-04-08T10:15:00")),
          //     },
          //     {
          //       ip: "198.51.100.2",
          //       data: Timestamp.fromMillis(Date.parse("2023-12-30T23:45:15")),
          //     },
          //     {
          //       ip: "203.0.113.2",
          //       data: Timestamp.fromMillis(Date.parse("2023-08-02T04:10:30")),
          //     },
          //     {
          //       ip: "192.168.2.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-10-07T12:25:00")),
          //     },
          //     {
          //       ip: "10.0.0.3",
          //       data: Timestamp.fromMillis(Date.parse("2023-03-29T20:30:45")),
          //     },
          //     {
          //       ip: "172.16.0.3",
          //       data: Timestamp.fromMillis(Date.parse("2023-07-18T03:15:30")),
          //     },
          //     {
          //       ip: "192.0.2.3",
          //       data: Timestamp.fromMillis(Date.parse("2023-06-01T14:45:00")),
          //     },
          //     {
          //       ip: "198.51.100.3",
          //       data: Timestamp.fromMillis(Date.parse("2023-12-15T04:20:15")),
          //     },
          //     {
          //       ip: "203.0.113.3",
          //       data: Timestamp.fromMillis(Date.parse("2023-09-03T11:30:30")),
          //     },
          //     {
          //       ip: "192.168.3.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-10-21T05:10:00")),
          //     },
          //     {
          //       ip: "10.0.0.4",
          //       data: Timestamp.fromMillis(Date.parse("2023-02-18T13:30:45")),
          //     },
          //     {
          //       ip: "172.16.0.4",
          //       data: Timestamp.fromMillis(Date.parse("2023-07-06T18:30:30")),
          //     },
          //     {
          //       ip: "192.0.2.4",
          //       data: Timestamp.fromMillis(Date.parse("2023-05-12T09:00:00")),
          //     },
          //     {
          //       ip: "198.51.100.4",
          //       data: Timestamp.fromMillis(Date.parse("2023-11-23T12:15:15")),
          //     },
          //     {
          //       ip: "203.0.113.4",
          //       data: Timestamp.fromMillis(Date.parse("2023-07-29T23:50:30")),
          //     },
          //     {
          //       ip: "192.168.4.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-11-11T18:35:00")),
          //     },
          //     {
          //       ip: "10.0.0.5",
          //       data: Timestamp.fromMillis(Date.parse("2023-01-23T07:30:45")),
          //     },
          //     {
          //       ip: "172.16.0.5",
          //       data: Timestamp.fromMillis(Date.parse("2023-07-15T13:45:30")),
          //     },
          //     {
          //       ip: "192.0.2.5",
          //       data: Timestamp.fromMillis(Date.parse("2023-04-29T01:00:00")),
          //     },
          //     {
          //       ip: "198.51.100.5",
          //       data: Timestamp.fromMillis(Date.parse("2023-10-05T08:40:15")),
          //     },
          //     {
          //       ip: "203.0.113.5",
          //       data: Timestamp.fromMillis(Date.parse("2023-06-19T17:20:30")),
          //     },
          //     {
          //       ip: "192.168.5.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-12-06T09:55:00")),
          //     },
          //     {
          //       ip: "10.0.0.6",
          //       data: Timestamp.fromMillis(Date.parse("2023-03-03T16:30:45")),
          //     },
          //     {
          //       ip: "172.16.0.6",
          //       data: Timestamp.fromMillis(Date.parse("2023-07-21T08:00:30")),
          //     },
          //     {
          //       ip: "192.0.2.6",
          //       data: Timestamp.fromMillis(Date.parse("2023-05-09T19:30:00")),
          //     },
          //     {
          //       ip: "198.51.100.6",
          //       data: Timestamp.fromMillis(Date.parse("2023-11-29T23:00:15")),
          //     },
          //     {
          //       ip: "203.0.113.6",
          //       data: Timestamp.fromMillis(Date.parse("2023-07-12T06:40:30")),
          //     },
          //     {
          //       ip: "192.168.6.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-10-02T14:05:00")),
          //     },
          //     {
          //       ip: "10.0.0.7",
          //       data: Timestamp.fromMillis(Date.parse("2023-02-28T23:30:45")),
          //     },
          //     {
          //       ip: "172.16.0.7",
          //       data: Timestamp.fromMillis(Date.parse("2023-07-28T10:00:30")),
          //     },
          //     {
          //       ip: "192.0.2.7",
          //       data: Timestamp.fromMillis(Date.parse("2023-05-04T20:15:00")),
          //     },
          //     {
          //       ip: "198.51.100.7",
          //       data: Timestamp.fromMillis(Date.parse("2023-12-21T08:30:15")),
          //     },
          //     {
          //       ip: "203.0.113.7",
          //       data: Timestamp.fromMillis(Date.parse("2023-08-16T13:50:30")),
          //     },
          //     {
          //       ip: "192.168.7.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-10-31T01:25:00")),
          //     },
          //     {
          //       ip: "10.0.0.8",
          //       data: Timestamp.fromMillis(Date.parse("2023-01-15T05:30:45")),
          //     },
          //     {
          //       ip: "172.16.0.8",
          //       data: Timestamp.fromMillis(Date.parse("2023-07-11T16:15:30")),
          //     },
          //     {
          //       ip: "192.0.2.8",
          //       data: Timestamp.fromMillis(Date.parse("2023-04-25T04:45:00")),
          //     },
          //     {
          //       ip: "198.51.100.8",
          //       data: Timestamp.fromMillis(Date.parse("2023-11-17T07:10:15")),
          //     },
          //     {
          //       ip: "203.0.113.8",
          //       data: Timestamp.fromMillis(Date.parse("2023-07-07T11:40:30")),
          //     },
          //     {
          //       ip: "192.168.8.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-11-19T15:15:00")),
          //     },
          //     {
          //       ip: "10.0.0.9",
          //       data: Timestamp.fromMillis(Date.parse("2023-02-07T18:30:45")),
          //     },
          //     {
          //       ip: "172.16.0.9",
          //       data: Timestamp.fromMillis(Date.parse("2023-07-17T01:45:30")),
          //     },
          //     {
          //       ip: "192.0.2.9",
          //       data: Timestamp.fromMillis(Date.parse("2023-05-28T12:00:00")),
          //     },
          //     {
          //       ip: "198.51.100.9",
          //       data: Timestamp.fromMillis(Date.parse("2023-12-06T18:20:15")),
          //     },
          //     {
          //       ip: "203.0.113.9",
          //       data: Timestamp.fromMillis(Date.parse("2023-08-29T03:40:30")),
          //     },
          //     {
          //       ip: "192.168.9.1",
          //       data: Timestamp.fromMillis(Date.parse("2023-10-14T11:05:00")),
          //     },
          //     {
          //       ip: "10.0.0.10",
          //       data: Timestamp.fromMillis(Date.parse("2023-01-31T20:30:45")),
          //     },
          // ];

          // this.updateDocument("blog", id, post).then((res) => {
          //   console.log("ok");
          // });
          console.log("ip deja gasit");
        }
      });
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
