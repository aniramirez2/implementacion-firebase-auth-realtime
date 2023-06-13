
import { collection, addDoc } from "firebase/firestore";
import { firestore } from '../firebase/firebaseConfig';

const coleccionUsuarios = collection(firestore, "users");


export const createUser = async () => {
    try {
        const docRef = await addDoc(coleccionUsuarios, {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}