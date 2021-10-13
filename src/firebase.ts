import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getDatabase } from 'firebase/database'

const app = firebase.initializeApp({
    apiKey: 'AIzaSyByRrcrIeou9sd952HeyHEP7XWioANlfFY',
    authDomain: 'generator-dev.firebaseapp.com',
    projectId: 'tickets-generator-dev',
    storageBucket: 'tickets-generator-dev.appspot.com',
    messagingSenderId: '846713060950',
    appId: '1:846713060950:web:3de874eb34875ab44d45f7',
})

export const auth = app.auth()
export const database = getDatabase(app)
export const fireStore = firebase.firestore

export default app
