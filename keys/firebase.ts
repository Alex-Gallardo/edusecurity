import firebase, { initializeApp } from "firebase/app";

export default function getApp() {
  let app = null;

  if (!firebase || firebase?.getApps().length === 0) {
    
    const firebaseConfig = {
      apiKey: "AIzaSyB5rCrnxBKSvnSxJF8E1dgQHgbCNkF55Hs",
      authDomain: "edusecurityumg.firebaseapp.com",
      projectId: "edusecurityumg",
      storageBucket: "edusecurityumg.appspot.com",
      messagingSenderId: "878869000440",
      appId: "1:878869000440:web:9703ecbc23abd818ebcb0d",
      measurementId: "G-F0Z69J2XW2",
    };

    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    // firebase.analytics;
  } else {
    app = firebase?.getApp();
  }
  return app;
}
