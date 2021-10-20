import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import ReduxSagaFirebase from 'redux-saga-firebase'

const app = firebase.initializeApp({
    apiKey: 'AIzaSyByRrcrIeou9sd952HeyHEP7XWioANlfFY',
    authDomain: 'tickets-generator-dev.firebaseapp.com',
    databaseURL: 'https://tickets-generator-dev-default-rtdb.firebaseio.com',
    projectId: 'tickets-generator-dev',
    storageBucket: 'tickets-generator-dev.appspot.com',
    messagingSenderId: '846713060950',
    appId: '1:846713060950:web:3de874eb34875ab44d45f7',
})

export const auth = app.auth()
export const firestore = app.firestore()
export const rsf = new ReduxSagaFirebase(app)

export default app
