import { useState, useEffect } from 'react';
// FIREBASE
import firebase from 'firebase';
import { firestore } from '../util/firebase';

export const useCollectionSnapshot = async (collectionPath: string) => {
    // STATE & VARIABLES
    const [colSnap, setColSnap] = useState<firebase.firestore.DocumentData[] | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<Error | string | null>(null);

    // useEFFECT
    useEffect(() => {
        // set state
        setIsPending(true);
        setError(null);

        const collectionRef = firestore.collection(collectionPath);
        const unsubscribe = collectionRef.onSnapshot(snapshot => {
            const docs = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    createdAt: doc.data().createdAt.toMillis(),
                    updatedAt: doc.data().updatedAt.toMillis(),
                }
            })
            setColSnap(docs);       
            setIsPending(false);
        }, (error => {
            setError(error);
            setIsPending(false);
        }))

        // unsubscribe 
        return () => unsubscribe();
    }, [collectionPath]);

    return { colSnap, isPending, error };
}