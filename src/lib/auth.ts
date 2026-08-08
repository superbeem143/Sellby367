import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './firebase'
import { AuthUser } from '../types/sellby'

export async function registerWithEmail(name:string, email:string, password:string){
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(cred.user, { displayName: name })
  const userRef = doc(db, 'users', cred.user.uid)
  const userData: AuthUser = {
    id: cred.user.uid,
    name,
    email: cred.user.email || '',
    avatarUrl: '',
    createdAt: serverTimestamp()
  }
  await setDoc(userRef, userData)
  return cred
}

export async function loginWithEmail(email:string, password:string){
  return signInWithEmailAndPassword(auth, email, password)
}

export async function logout(){
  return signOut(auth)
}

export async function sendReset(email:string){
  return sendPasswordResetEmail(auth, email)
}

export async function getUserProfile(uid:string){
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  return snap.exists() ? (snap.data() as AuthUser) : null
}
