import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

export async function uploadImage(file: File, path = 'images'){
  const id = Date.now().toString()
  const storageRef = ref(storage, `${path}/${id}_${file.name}`)
  const snap = await uploadBytesResumable(storageRef, file)
  const url = await getDownloadURL(snap.ref)
  return url
}
