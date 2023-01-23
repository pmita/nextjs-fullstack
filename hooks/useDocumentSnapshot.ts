import { useEffect, useState } from 'react';
// FIREBASE
import { firestore } from '../util/firebase';
import firebase from 'firebase';
// HOOKS
import { useMounted } from './useMounted';

export const useDocumentSnapshot = (docPath: string) => {
    // STATE & VARIABLES
    const [docSnapshot, setDocSnapshot] = useState<firebase.firestore.DocumentData | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<Error | string | null>(null);
    const isMounted = useMounted();

    // USEEFFECT
    useEffect(() => {
        setIsPending(true);
        setError(null);


        const subDocRef = firestore.doc(docPath);
        const unsubscribe = subDocRef.onSnapshot(doc => {
            if (doc.exists) {
                if (isMounted.current) setDocSnapshot(doc.data());
                if (isPending && isMounted.current) setIsPending(false);
            } else {
                if (isMounted.current) {
                    setDocSnapshot(null); 
                    setError('Document does not exist');
                }
                if (isPending && isMounted.current) setIsPending(false);
            }
        }, (error => {
            if (isMounted.current) setError(error);
            if (isPending && isMounted.current) setIsPending(false);

        }))

        return () => unsubscribe()
    }, [docPath, isMounted, isPending]);

    return { docSnapshot, isPending, error };
}
