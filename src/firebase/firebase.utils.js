import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyBAzEvfW7D4NAXC60Ocx8uXRJaMCDAH4eA",
  authDomain: "crwn-db-3cc3d.firebaseapp.com",
  databaseURL: "https://crwn-db-3cc3d.firebaseio.com",
  projectId: "crwn-db-3cc3d",
  storageBucket: "crwn-db-3cc3d.appspot.com",
  messagingSenderId: "1003639011740",
  appId: "1:1003639011740:web:c9472b03228768a6cb7059",
  measurementId: "G-0SD39NPLGM"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if(!snapShot.exists){
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try{
      await userRef.set({
        displayName,
        email,
        ...additionalData
      })
    }catch(error){
      console.log('error creat', error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({prompt:'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase