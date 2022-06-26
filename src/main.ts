// vue 3
import { createApp } from "vue";
import App from "./App.vue";
// routing
import router from "./router";
// store
import { createPinia } from "pinia";
// firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDKZxNz90PBrnXmBIt0uYNbtmZoV_Ehk_Y",
  authDomain: "de-wandelende-takken.firebaseapp.com",
  projectId: "de-wandelende-takken",
  storageBucket: "de-wandelende-takken.appspot.com",
  messagingSenderId: "626438875286",
  appId: "1:626438875286:web:e3359c051808a6a804fab7",
  measurementId: "G-EEX9DMPCQW",
};
initializeApp(firebaseConfig);
getFirestore();
// used items in app
createApp(App).use(createPinia()).use(router).mount("#app");
