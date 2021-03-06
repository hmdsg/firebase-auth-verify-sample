import {app} from './firebase.js'
import { getAuth, signInAnonymously, sendSignInLinkToEmail, onAuthStateChanged, deleteUser} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

const auth = getAuth();
var account = document.getElementById('account');
var isanon = document.getElementById('isanon');
var localAddressElement = document.getElementById('localAddress');
var localPasswordElement = document.getElementById('localPassword');
var anonymousLoginResultElement = document.getElementById('anonymousLoginResult');
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


    if (!user.isAnonymous){
      isanon.style.color = "red";
    }
  } else {
    loginStatusElement.innerText = "未ログイン";
  }
});


document.getElementById('anonymousLogin').addEventListener('click', function(){
    // 匿名ログイン
    signInAnonymously(auth)
    .then(data => {
        console.log("anonymous login success");
        console.log(data);
        anonymousLoginResultElement.innerText = "匿名ログインに成功";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error");
        anonymousLoginResultElement.innerText =  error.message;
    });
});


document.getElementById('sendEmail').addEventListener('click', function(){
    const emailTextbox = document.getElementById('email');
    const PasswordTextbox = document.getElementById('password');
    const email = emailTextbox.value;
    const password = PasswordTextbox.value;

    // 匿名ログインを行うURL
    const callbackUrl =  "https://gcp-web-infra.web.app/update.html";
    const actionCodeSettings = {
        url: callbackUrl,
        handleCodeInApp: true
    };

    // メール送信
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(function() {
        // local storageへセット
        window.localStorage.setItem('emailForSignIn', email);
        window.localStorage.setItem('passwordForSignIn', password);
        localAddressElement.innerText = window.localStorage.getItem("emailForSignIn");
        localPasswordElement.innerText =  window.localStorage.getItem("passwordForSignIn");
        console.log("send mail success");
        window.location.href = './send.html'; 
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
});

document.getElementById('resetLocalStorage').addEventListener('click', function(){
      // local storage内の値を削除
      window.localStorage.removeItem("emailForSignIn");
      window.localStorage.removeItem("passwordForSignIn");
});

document.getElementById('deleteUser').addEventListener('click', function(){
  const user = auth.currentUser;
  deleteUser(user).then(() => {
    // User deleted.
    console.log("delete success");
    window.location.reload(true);
  }).catch((error) => {
    // An error ocurred
    console.log(error);
  });
});