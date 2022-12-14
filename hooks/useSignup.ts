import React, { useContext } from 'react';
// NEXT
import { useRouter } from 'next/router';
// FIREBASE
import { fireAuth, fireStore } from '../util/firebase';
// CONTEXT
import { AuthContext } from '../context/AuthContext';

interface SignUpInterface {
    (email: string, password: string, username: string): void;
}

export const useSignup = () => {
    //STATE & VARIABLES
    const { dispatch } = useContext(AuthContext);
    const router = useRouter();

    const signup: SignUpInterface = async (email, password, username) => {
        dispatch({ type: 'SIGN_UP_IS_LOADING' });

        try {
            const response = await fireAuth.createUserWithEmailAndPassword(email, password);
            if(!response) {
                throw new Error('Sign up was not successful');
            }

            // create references to firestore collections
            const userRef = fireStore.collection('users').doc(response.user.uid);
            const usernameRef = fireStore.collection('usernames').doc(username);
            // create firebase batch
            const batch = fireStore.batch();
            // add details to eachh document
            batch.set(userRef, { email, username });
            batch.set(usernameRef, { uid: response.user.uid });
            // commit batch
            await batch.commit();

            dispatch({ type: 'SIGN_UP_SUCCESS', payload: response.user })
            router.push('/');
        }catch(err) {
            dispatch({ type: 'SIGN_UP_ERROR', payload: err.message });
        }
    }

    return { signup };
}