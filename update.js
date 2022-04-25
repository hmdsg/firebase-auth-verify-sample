import {app} from './firebase.js'
import { getAuth,onAuthStateChanged, EmailAuthProvider, linkWithCredential, signInWithEmailAndPassword, deleteUser} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

const auth = getAuth();
var account = document.getElementById('account');
var isanon = document.getElementById('isanon');
var localAddressElement = document.getElementById('localAddress');
var localPasswordElement = document.getElementById('localPassword');
var passwordLoginStatusElement = document.getElementById('passwordLoginStatus');
var loginStatusElement = document.getElementById('loginStatus');
var updateStatus = document.getElementById('updateStatus');

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

    if (!user.isAnonymous){
      isanon.style.color = "red";
      }
    } else {
    loginStatusElement.innerText = "未ログイン";
  }
});

document.getElementById('updateLogin').addEventListener('click', function(){
    //local storageから取得
    const email = window.localStorage.getItem("emailForSignIn");
    const password = window.localStorage.getItem("passwordForSignIn");

    const credential = EmailAuthProvider.credential(email, password);

    // 永久アカウントへ変更
    linkWithCredential(auth.currentUser, credential)
    .then((usercred) => {
      const user = usercred.user;
      console.log("Anonymous account successfully upgraded", user);
      isanon.innerText = user.isAnonymous;
      
      // local storage内の値を削除
      window.localStorage.removeItem("emailForSignIn");
      window.localStorage.removeItem("passwordForSignIn");

      window.location.reload(true);
    }).catch((error) => {
      updateStatus.style.color = "red";
      updateStatus.innerText = error.message;
      console.log("Error upgrading anonymous account", error);
    });
});

document.getElementById('emailLogin').addEventListener('click', function(){
    // パスワード認証
    const emailTextbox = document.getElementById('email');
    const PasswordTextbox = document.getElementById('password');
    const email = emailTextbox.value;
    const password = PasswordTextbox.value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("email login success");
        passwordLoginStatusElement.innerText = "パスワードログイン成功";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        passwordLoginStatusElement.innerText = "パスワードログイン失敗";
        console.log(errorCode, errorMessage);
    });
});

document.getElementById('deleteUser').addEventListener('click', function(){
    const user = auth.currentUser;
    deleteUser(user).then(() => {
      // User deleted.
      console.log("delete success");
      window.location.reload(true);
    }).catch((error) => {
      console.log(error);
    });
  });
