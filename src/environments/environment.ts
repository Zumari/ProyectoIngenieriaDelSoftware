// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false.valueOf,
  authUrl:"http://localhost:3000/auth/login",
  registerUrl:"http://localhost:3000/users/register",
  firebase: {
    apiKey: "AIzaSyA_ptYCH3I_6ex_JKF0oSivhrrvaQHljmc",
    authDomain: "industria-project.firebaseapp.com",
    projectId: "industria-project",
    storageBucket: "industria-project.appspot.com",
    messagingSenderId: "469965971504",
    appId: "1:469965971504:web:01f1648a9cbc3a73908df5"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
