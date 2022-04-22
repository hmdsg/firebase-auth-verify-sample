// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4e6lmtpwGOrG9-z6NuxOpo7wrmobZMKs",
    authDomain: "gcp-web-infra.firebaseapp.com",
    projectId: "gcp-web-infra",
    storageBucket: "gcp-web-infra.appspot.com",
    messagingSenderId: "348184374813",
    appId: "1:348184374813:web:ea450eec732458905a60f4",
    measurementId: "G-12YZ43MNLH"
};

const app = initializeApp(firebaseConfig);

export {app}
