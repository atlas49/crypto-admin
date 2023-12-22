import db from '../database';
import { DocumentData, QuerySnapshot, addDoc, collection, deleteDoc, getDocs, query, where, } from 'firebase/firestore';

const extractData = (querySnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
	const data: DocumentData = [];

	querySnapshot.forEach((doc) => {
		if (doc.data()) {
			data.push(doc.data());
		}
	});

	return data;
};


const getDataFromDB = async (collectionName: string) => {
	const q = query(collection(db, collectionName));

	const querySnapshot = await getDocs(q);
	const data = extractData(querySnapshot) as [];
	return data;
}

const setDataToDB = async (collectionName: string, data: any) => {
	await addDoc(collection(db, collectionName), data);
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

	return { getData, setData, deleteData }
}

export default useDatabase;