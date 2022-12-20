import { useEffect, useState } from 'react';
// FIREBASE
import { firestore } from '../util/firebase';
import firebase from 'firebase';

export const useDocumentSnapshot = (docPath: string) => {
    // STATE & VARIABLES
    const [docSnapshot, setDocSnapshot] = useState<firebase.firestore.DocumentData | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<Error | string | null>(null);

    // USEEFFECT
    useEffect(() => {
        setIsPending(true);
        setError(null);


        const subDocRef = firestore.doc(docPath);
        const unsubscribe = subDocRef.onSnapshot(doc => {
            if (doc.exists) {
                setDocSnapshot(doc.data());
                setIsPending(false);
            } else {
                setDocSnapshot(null);
                setIsPending(false);
                setError('Document does not exist');
                setIsPending(false);
            }
        }, (error => {
            setError(error);
            setIsPending(false);

        }))

        return () => unsubscribe()
    }, [docPath]);

    return { docSnapshot, isPending, error };
}
