import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDpWFuaaVTUn-30OtUs_Ireyo8INk1RUd4",
  authDomain: "authentication-a5d65.firebaseapp.com",
  projectId: "authentication-a5d65",
  storageBucket: "authentication-a5d65.appspot.com",
  messagingSenderId: "292905471557",
  appId: "1:292905471557:web:97a0f82cc21a15e7b61d2c",
  measurementId: "G-03S4PPE8EK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export const auth=getAuth(app)
// export const database = getDatabase(app);
 const auth=getAuth(app)
 const database = getDatabase(app);
 export {auth,database};