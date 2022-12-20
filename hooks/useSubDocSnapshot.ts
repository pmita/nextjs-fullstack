import React, { useState } from 'react';
// FIREBASE
import { firestore } from '../util/firebase';

const useSubDocSnapshot = (docPath: string) => {
    // STATE & VARIABLES
    const [subDocData, setSubDocData] = useState<any>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<Error | string | null>(null);

    // FUNCTIONS
    const subDocOnSnapshot = async () => {
        setIsPending(true);
        setError(null);

        try{
            const subDocRef = firestore.doc(docPath).get()
        }catch (err) {
            setError(err.message);
            setIsPending(false);
        }
    }

    return { subDocOnSnapshot, subDocData, isPending, error };
}