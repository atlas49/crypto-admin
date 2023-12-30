import db from '../database';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where, } from 'firebase/firestore';

const getDataFromDB = async (collectionName: string) => {
	const q = query(collection(db, collectionName));
	const querySnapshot = await getDocs(q);

	const data = querySnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});

	return data as any;
}

const setDataToDB = async (collectionName: string, data: any) => {
	const docRef = await addDoc(collection(db, collectionName), data);
	return docRef.id
}

const deleteById = async (collectionName: string, documentId: string) => {
	const documentRef = doc(db, collectionName, documentId);
	deleteDoc(documentRef)
		.then(() => {
			console.log('Document successfully deleted!');
		})
		.catch((error) => {
			console.error('Error removing document: ', error);
		});
}
const updateData = async (updatedData: any, collectionName: string, documentId: string) => {
	const docRef = doc(collection(db, collectionName), documentId);
	updateDoc(docRef, updatedData)
		.then(() => {
			console.log('Document successfully updated!');
		})
		.catch((error) => {
			console.error('Error updating document: ', error);
		});
}


const deleteDocuments = async (collectionName: string, fieldName: string, valueToDelete: string) => {
	try {
		const q = query(collection(db, collectionName), where(fieldName, '!=', valueToDelete));

		const querySnapshot = await getDocs(q);

		querySnapshot.forEach(async (doc) => {
			await deleteDoc(doc.ref);
			console.log(`Document with ID ${doc.id} deleted successfully.`);
		});

		console.log('All documents deleted successfully.');
	} catch (error) {
		console.error('Error deleting documents:', error);
	}
}

const useDatabase = () => {

	const getData = async (collectionName: string) => getDataFromDB(collectionName).then(data => data);
	const setData = async (collectionName: string, data: any) => setDataToDB(collectionName, data);
	const deleteData = async (collectionName: string, fieldName: string, valueToDelete: string) => deleteDocuments(collectionName, fieldName, valueToDelete);

	return { getData, setData, deleteData, updateData, deleteById }
}

export default useDatabase;