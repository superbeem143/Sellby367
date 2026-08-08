import { collection, addDoc, doc, getDoc, onSnapshot, query, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import { Message } from '../types/sellby'

const threadsCol = collection(db, 'chatThreads')

export async function openOrGetThread(listingId:string, buyerId:string, sellerId:string){
  // naive approach: create a thread doc with composite id
  const threadRef = await addDoc(threadsCol, {
    listingId,
    buyerId,
    sellerId,
    lastMessage: '',
    updatedAt: serverTimestamp()
  })
  return threadRef.id
}

export async function sendMessage(threadId:string, message: Omit<Message,'id'|'createdAt'>){
  const messagesCol = collection(db, `chatThreads/${threadId}/messages`)
  const docRef = await addDoc(messagesCol, {
    ...message,
    createdAt: serverTimestamp(),
    read: false
  })
  await updateDoc(doc(db,'chatThreads',threadId), { lastMessage: message.text, updatedAt: serverTimestamp() })
  return docRef.id
}

export function subscribeThreadMessages(threadId:string, cb:(messages:Message[])=>void){
  const q = query(collection(db, `chatThreads/${threadId}/messages`), orderBy('createdAt','asc'))
  return onSnapshot(q, snap=>{
    const msgs = snap.docs.map(d=>({ id:d.id, ...(d.data() as any)})) as Message[]
    cb(msgs)
  })
}
