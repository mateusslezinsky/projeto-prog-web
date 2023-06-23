import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlgH8YhkxksdTV1S2jYQ-iBABAjYq_tLU",
  authDomain: "projeto-web-1edfa.firebaseapp.com",
  projectId: "projeto-web-1edfa",
  storageBucket: "projeto-web-1edfa.appspot.com",
  messagingSenderId: "958849048119",
  appId: "1:958849048119:web:5a31a3eb4040758a8029b2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
