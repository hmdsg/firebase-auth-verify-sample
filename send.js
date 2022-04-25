import {app} from './firebase.js'
import { getAuth,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

const auth = getAuth();
var account = document.getElementById('account');
var isanon = document.getElementById('isanon');
var localAddressElement = document.getElementById('localAddress');
var localPasswordElement = document.getElementById('localPassword');
var loginStatusElement = document.getElementById('loginStatus');

window.onload = function(){
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    loginStatusElement.innerText = "ログイン中";
  } else {
    // No user is signed in.
    loginStatusElement.innerText = "未ログイン";
  }
};
  
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const isAnonymous = user.isAnonymous;
    account.innerText = uid;
    isanon.innerText = isAnonymous;
    localAddressElement.innerText = window.localStorage.getItem("emailForSignIn");
    localPasswordElement.innerText =  window.localStorage.getItem("passwordForSignIn");
    loginStatusElement.innerText = "ログイン中";
  } else {
    loginStatusElement.innerText = "未ログイン";
  }
});