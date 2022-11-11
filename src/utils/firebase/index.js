import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.error(error);
    }
  }

  return userDocRef;
};
