import React, { useContext } from 'react';
// NEXT
import { useRouter } from 'next/router';
// FIREBASE
import { fireAuth } from '../util/firebase';
// CONTEXT
import { AuthContext } from '../context/AuthContext';

export const useSignout = () => {
    // STATE & VARIABLES
    const { dispatch } = useContext(AuthContext);
    const router = useRouter();

    const signout = async () => {
        dispatch({ type: 'SIGN_OUT_IS_LOADING' });

        try{
            await fireAuth.signOut();
            dispatch({ type: 'SIGN_OUT_SUCCESS' });
            router.push('/signin');
        } catch(err) {
            dispatch({ type: 'SIGN_OUT_ERROR', payload: err.message });
        }
    }

    return { signout };
}