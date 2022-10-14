// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export const environment = {
  production: false,

  firebase: {
    apiKey: "AIzaSyAnYha1sCm0LSUtUtN4jK_VpwZ1MdFrhEg",
    authDomain: "techx-e7500.firebaseapp.com",
    projectId: "techx-e7500",
    storageBucket: "techx-e7500.appspot.com",
    messagingSenderId: "480045903025",
    appId: "1:480045903025:web:0627b98b5fbabc31f88690",
    vapidKey: "BIBI6z8JTLwZPnUIzl3kbVBUYynDaWgt6zGdkYA-FkjT9KyjMRhmQPdUaSmH7WBZpQRa32Ab94PCdeVBoj8ps4E"
  }
};

const app = initializeApp(environment.firebase);
export const db = getFirestore(app);




/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
