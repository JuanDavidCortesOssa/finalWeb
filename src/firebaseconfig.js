import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCaxbKADlFOtGZx8Zq3tg2pxaPn4mRdh64",
    authDomain: "finalauth-80c74.firebaseapp.com",
    projectId: "finalauth-80c74",
    storageBucket: "finalauth-80c74.appspot.com",
    messagingSenderId: "451051315577",
    appId: "1:451051315577:web:c7da32ad82b45d860d0fa8",
    measurementId: "G-KXZWLWW73Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);