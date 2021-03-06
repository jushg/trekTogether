import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage";

import {
    API_KEY,
    AUTH_DOMAIN,
    // DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
} from "@env";

const firebaseConfig = {
    //please setup .env file
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    // databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
}

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebaseApp;
