import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseapp = firebase.initializeApp({
    apiKey: "AIzaSyCaxbKADlFOtGZx8Zq3tg2pxaPn4mRdh64",
    authDomain: "finalauth-80c74.firebaseapp.com",
    projectId: "finalauth-80c74",
    storageBucket: "finalauth-80c74.appspot.com",
    messagingSenderId: "451051315577",
    appId: "1:451051315577:web:c7da32ad82b45d860d0fa8",
    measurementId: "G-KXZWLWW73Y"
})

export const auth = firebase.auth();
export default firebaseapp;