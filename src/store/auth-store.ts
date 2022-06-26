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
      // let userName = await userIndexedDB.getUserName();
      // console.log(userName);
      // return userName;
    },
    getUID: () => {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.uid;
    },
    getPhotoURL: () => {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.photoURL;
    },
    async isLoggedIn(state) {
      let isLoggedIn = await userIndexedDB.isLoggedIn();

      return isLoggedIn;
    },
  },
  actions: {
    // https://stackoverflow.com/questions/60151181/object-is-of-type-unknown-typescript-generics
    async registerWithEmail(value: { email: string; password: string }) {
      const auth: any = getAuth();

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          value.email,
          value.password
        );
        let user = userCredential.user;
        // this.name =user.displayName

        return null;
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(errorMessage);
      }
    },

    async login(value: { email: string; password: string }) {
      const auth: any = getAuth();

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          value.email,
          value.password
        );
        const user = userCredential.user;
        return { succes: true, errorMessage: "" };
        // https://stackoverflow.com/questions/40141005/property-code-does-not-exist-on-type-error
      } catch (error: any) {
        switch (error.code) {
          case "auth/invalid-email":
            return { succes: false, error: "Invalid email" };
          case "auth/user-not-found":
            return {
              succes: false,
              error: "No account with that email was found",
            };
          case "auth/wrong-password":
            return { succes: false, error: "Incorrect password" };
          default:
            return {
              succes: false,
              error: "Email or password was incorrect",
            };
        }
      }
    },
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

          // this.isLoggedIn;
        })
        .catch((error: FirebaseError) => {
          let auth = getAuth();
          let user = auth.currentUser;
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
