import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBqWmGTsmfFJSy9x5ld9Rb5u9GEBBKF2FE",
    authDomain: "venepop-b642b.firebaseapp.com",
    databaseURL: "https://venepop-b642b-default-rtdb.firebaseio.com/",
    projectId: "venepop-b642b",
    storageBucket: "venepop-b642b.firebasestorage.app",
    messagingSenderId: "257279813856",
    appId: "1:257279813856:web:32733306545744437e8885"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);
export { db };