import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let app = '';

const firebaseConfig = {
    apiKey: "AIzaSyB0pQzE_7mL3RcJGc8J3mp2mLSDwZ0Pb9c",
    authDomain: "klasker-ger.firebaseapp.com",
    databaseURL: "https://klasker-ger.firebaseio.com",
    projectId: "klasker-ger",
    storageBucket: "klasker-ger.appspot.com",
    messagingSenderId: "902940711568",
    appId: "1:902940711568:web:dd517765f5c083a6655615",
    measurementId: "G-TQS0JPSKT9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
})

