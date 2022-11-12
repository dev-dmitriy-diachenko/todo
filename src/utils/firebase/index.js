import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBQBRLOrjSNCcRZ8a1fanmM8UPRw9ckQ-s',
  authDomain: 'todo-db-b8c82.firebaseapp.com',
  projectId: 'todo-db-b8c82',
  storageBucket: 'todo-db-b8c82.appspot.com',
  messagingSenderId: '760286849046',
  appId: '1:760286849046:web:4bb72632360c24ffa36d37',
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
