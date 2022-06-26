// https://pinia.vuejs.org/core-concepts/actions.html using actions from other store files
import { defineStore } from "pinia";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import router from "../router";
import { createUser } from "./user-firestore";
import userIndexedDB from "./user-indexedDB";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      name: "",
      email: "",
      photoURL: "",
      UID: "",
      phoneNumber: "",
    };
  },
  getters: {
    getUsername: () => {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.displayName;
    },
    getUID: () => {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.uid;
    },
    getPhotoURL: () => {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.photoURL;
    },
    isLoggedIn() {
      return userIndexedDB.isLoggedIn();
    },
  },
  actions: {
    async registerOrLoginWithGoogle() {
      const provider: GoogleAuthProvider = new GoogleAuthProvider();
      const auth: any = getAuth();
      signInWithPopup(auth, provider)
        .then((result: { user: any }) => {
          const user = result.user;
          this.name = user.displayName;
          this.email = user.email;
          this.photoURL = user.photoURL;
          this.UID = user.uid;
          this.phoneNumber = user.phoneNumber;

          localStorage.setItem("user", JSON.stringify(user));

          userIndexedDB.addUser("475", user.uid, user.displayName);
          createUser(user.displayName, user.email, user.uid);
          router.push({ path: "/wandelapp/home" });
        })
        .catch((error: FirebaseError) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(errorMessage, credential, errorCode);
        });
    },
    async logOut() {
      const auth: any = getAuth();
      return signOut(auth)
        .then(() => {
          userIndexedDB.LogOut();
          localStorage.removeItem("user");

          // known issues with firebase auth logout
          indexedDB.deleteDatabase("firebaseLocalStorageDb");
          router.push({ path: "/wandelapp/" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async onAuthChange() {
      let auth = getAuth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.name = user.displayName;
          this.photoURL = user.photoURL;
          this.UID = user.uid;
        }
      });
    },
  },
});
