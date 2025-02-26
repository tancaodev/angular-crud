import { environment } from '../../../environments/environment';

export const firebaseConfig = {
    apiKey: environment.firebase.NG_APIKEY,
    authDomain: environment.firebase.NG_AUTH_DOMAIN,
    databaseURL: environment.firebase.NG_DATABASE_URL,
    projectId: environment.firebase.NG_PROJECT_ID,
    storageBucket: environment.firebase.NG_STORAGE_BUCKET,
    messagingSenderId: environment.firebase.NG_MESSAGE_SENDER_ID,
    appId: environment.firebase.NG_APP_ID,
    measurementId: environment.firebase.NG_MEASUREMENT_ID,
};
