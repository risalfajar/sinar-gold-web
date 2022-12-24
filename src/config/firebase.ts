import {initializeApp} from 'firebase/app'
import {connectAuthEmulator, getAuth} from 'firebase/auth'
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore'
import {connectStorageEmulator, getStorage} from 'firebase/storage'
import {connectFunctionsEmulator, getFunctions} from 'firebase/functions'
import {CloudFunctionConstants} from 'src/features/common/constants'

const firebaseConfig = {
    apiKey: "AIzaSyCBQ6c9z6x77zXFR_VDYzs87wM88mMibAs",
    authDomain: "sinar-gold.firebaseapp.com",
    projectId: "sinar-gold",
    storageBucket: "sinar-gold.appspot.com",
    messagingSenderId: "693665883369",
    appId: "1:693665883369:web:a8df791c43217765d4fc78",
    measurementId: "G-D247EVJJJS"
}

const app = initializeApp(firebaseConfig)
const Auth = getAuth(app)
const Firestore = getFirestore(app)
const Storage = getStorage(app)
const Functions = getFunctions(app, CloudFunctionConstants.DEFAULT_REGION)

const isDevelopment = import.meta.env.DEV
if (isDevelopment) {
    connectAuthEmulator(Auth, 'http://localhost:9099', {disableWarnings: true})
    connectFirestoreEmulator(Firestore, 'localhost', 8080)
    connectStorageEmulator(Storage, 'localhost', 9199)
    connectFunctionsEmulator(Functions, 'localhost', 5001)
}

export {Auth, Firestore, Storage, Functions}
