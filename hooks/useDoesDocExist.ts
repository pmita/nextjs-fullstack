import { useState, useCallback } from 'react';
// LIBRARIES
// import debounce from 'lodash.debounce';
// FIREBASE
import { fireStore } from '../util/firebase';
import { DebouncedFunc, debounce } from 'lodash';

// INTERFACES
interface IUseDoesDocExist {
    doesDocumentExist: DebouncedFunc<() => Promise<void>>;
    isAvailable: boolean;
    isLoading: boolean;
    error: Error | string | null;
}

export const useDoesDocExist = (docRef: string): IUseDoesDocExist => {
    // STATE & VARIALBES
    const [isAvailable, setIsAvailable] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | string | null>(null);

    // FUNCTIONS
    const doesDocumentExist = useCallback(debounce(async () => {
        setIsLoading(true);
        try{
            const usernameRef = fireStore.doc(docRef);
            const { exists } = await usernameRef.get();
            setIsAvailable(!exists);
            setIsLoading(false);
        } catch(err) {
            setError(err.message);
            setIsLoading(false);
        }
    }, 500), [docRef]);

    return { doesDocumentExist, isAvailable, isLoading, error}
}