import { useState, useEffect, useRef } from 'react';
// FIREBASE
import firebase from 'firebase';
import { firestore } from '../util/firebase';
// HOOKS
import { useMounted } from './useMounted';

export const useCollectionSnapshot = (id: string) => {
    // STATE & VARIABLES
    const [collectionSnapshot, setCollectionSnapshot] = useState<firebase.firestore.DocumentData[] | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<Error | string | null>(null);
    const isMounted = useMounted();

    // useEFFECT
    useEffect(() => {
        setIsPending(true);
        setError(null);

        // const collectionRef = firestore.collection(collectionPath);
        const collectionRef = firestore
        .collection('users')
        .doc(id)
        .collection('posts')
        .orderBy('createdAt', 'desc');
        const unsubscribe = collectionRef.onSnapshot(snapshot => {
            const docs = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    createdAt: doc.data().createdAt.toMillis(),
                    updatedAt: doc.data().updatedAt.toMillis(),
                }
            })
            if (isMounted.current) setCollectionSnapshot(docs);
            if (isPending && isMounted.current) setIsPending(false);
        }, (error => {
            if (isMounted.current) setError(error);
            if (isPending && isMounted.current) setIsPending(false);
        }))

        return () => unsubscribe();
    }, [id, isMounted, isPending]);

    return { collectionSnapshot, isPending, error };
}