import React, { useContext } from 'react';
// NEXT
import { useRouter } from 'next/router';
// FIREBASE
import { fireAuth } from '../util/firebase';
// CONTEXT
import { AuthContext } from '../context/AuthContext';

export const useSignin = () => {
    // STATE & VARIABLES
    const { dispatch } = useContext(AuthContext);
    const router = useRouter();

    const signin = async (email: string, password: string) => {
        dispatch({ type: 'SIGN_IN_IS_LOADING' });

        try {
            const response = await fireAuth.signInWithEmailAndPassword(email, password);
            if(!response) {
                throw new Error('Sign in was not successful');
            }

            dispatch({ type: 'SIGN_IN_SUCCESS', payload: response.user });
            router.push('/');
        } catch(err) {
            dispatch({ type: 'SIGN_IN_ERROR', payload: err.message });
        }
    }

    return { signin };
}