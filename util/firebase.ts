import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDFLegesBGtxFXs3S6OXVSc7qvKSkWzM1A",
    authDomain: "twatter-2c4a3.firebaseapp.com",
    projectId: "twatter-2c4a3",
    storageBucket: "twatter-2c4a3.appspot.com",
    messagingSenderId: "652657146908",
    appId: "1:652657146908:web:9bf5113a06793ae52473d9"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const fireAuth = firebase.auth();
export const fireStore = firebase.firestore();
export const fireStorage = firebase.storage();


