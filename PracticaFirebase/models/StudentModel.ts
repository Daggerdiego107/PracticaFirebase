import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Student {
  id?: string;
  matricula: string;
  nombre: string;
  semestre: number;
  createdAt?: Timestamp;
}

const COLLECTION_NAME = 'students';

export const StudentModel = {
  // CREATE
  add: async (student: Omit<Student, 'id' | 'createdAt'>) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...student,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error };
    }
  },

  // DELETE (NUEVA FUNCIÓN)
  remove: async (id: string) => {
    try {
      // Referencia al documento específico por ID
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      return { success: true };
    } catch (error) {
      console.error("Error removing document: ", error);
      return { success: false, error };
    }
  },

  // READ (SUBSCRIBE)
  subscribe: (callback: (data: Student[]) => void) => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const students = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Student[];
      callback(students);
    });
  }
};