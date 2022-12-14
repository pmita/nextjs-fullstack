import { createContext, useEffect, useReducer } from "react";
import { User } from "@firebase/auth-types";
// FIREBASE
import { fireAuth } from "../util/firebase";

export interface AuthStateInterface {
    user: User | null;
    isLoading: boolean;
    error: Error | string | null;
    authIsReady: boolean;
}

enum AuthActionType {
    AUTH_IS_READY = "AUTH_IS_READY",
    SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS",
    SIGN_UP_IS_LOADING = "SIGN_UP_IS_LOADING",
    SIGN_UP_ERROR = "SIGN_UP_ERROR",
    SIGN_IN_SUCCESS = "SIGN_UP_SUCCESS",
    SIGN_IN_IS_LOADING = "SIGN_UP_IS_LOADING",
    SIGN_IN_ERROR = "SIGN_UP_ERROR",
    SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS",
    SIGN_OUT_IS_LOADING = "SIGN_OUT_IS_LOADING",
    SIGN_OUT_ERROR = "SIGN_OUT_ERROR",
}

interface AuthIsReadyAction {
    type: AuthActionType.AUTH_IS_READY;
    payload: User | null;
}

/* Signing the User Up */
interface SignUpSuccessAction {
    type: AuthActionType.SIGN_UP_SUCCESS;
    payload: User | null;
}

interface SignUpIsLoadingAction {
    type: AuthActionType.SIGN_UP_IS_LOADING;
}

interface SignUpErrorAction {
    type: AuthActionType.SIGN_UP_ERROR;
    payload: Error | string | null;
}

/* Signing the User In */
interface SignInSuccessAction {
    type: AuthActionType.SIGN_IN_SUCCESS;
    payload: User | null;
}

interface SignInIsLoadingAction {
    type: AuthActionType.SIGN_IN_IS_LOADING;
}

interface SignInErrorAction {
    type: AuthActionType.SIGN_IN_ERROR;
    payload: Error | string | null;
}

/* Signing the User Out */
interface SignOutSuccessAction {
    type: AuthActionType.SIGN_OUT_SUCCESS;
}

interface SignOutIsLoadingAction {
    type: AuthActionType.SIGN_OUT_IS_LOADING;
}

interface SignOutErrorAction {
    type: AuthActionType.SIGN_OUT_ERROR;
    payload: Error | string | null;
}

const initialState: AuthStateInterface = {
    user: null,
    isLoading: false,
    error: null,
    authIsReady: false
}

interface Context extends AuthStateInterface {
    dispatch: React.Dispatch<any>;
}

export const AuthContext = createContext<Context>({} as Context);

const AuthStateReducer = (
    state: AuthStateInterface, 
    action: AuthIsReadyAction 
    | SignUpSuccessAction | SignUpErrorAction | SignUpIsLoadingAction
    | SignOutSuccessAction | SignOutErrorAction | SignOutIsLoadingAction
    | SignInSuccessAction | SignInErrorAction | SignInIsLoadingAction
) => {
    switch(action.type) {
        case AuthActionType.AUTH_IS_READY:
            return { ...state, user: action.payload, authIsReady: true, error: null }
        case AuthActionType.SIGN_UP_IS_LOADING:
        case AuthActionType.SIGN_IN_IS_LOADING:
        case AuthActionType.SIGN_OUT_IS_LOADING:
            return { ...state, isLoading: true, error: null };
        case AuthActionType.SIGN_UP_SUCCESS:
        case AuthActionType.SIGN_IN_SUCCESS:
            return { ...state, isLoading: false, user: action.payload, error: null };
        case AuthActionType.SIGN_OUT_SUCCESS:
            return { ...state, isLoading: false, user: null, error: null };
        case AuthActionType.SIGN_UP_ERROR:
        case AuthActionType.SIGN_IN_ERROR:
        case AuthActionType.SIGN_OUT_ERROR:
            return { ...state, isLoading: false, error: action.payload, user: null };
        default:
            return { ...state };
    }
}

export const AuthContextProvider = ({ children }) => {
    // STATE & VARIABLES
    const [state, dispatch] = useReducer(AuthStateReducer, initialState);

    // USEEFECTS
    useEffect(() => {
        const unsubscribe = fireAuth.onAuthStateChanged((user) => {
            if (user) {
                dispatch({ type: AuthActionType.AUTH_IS_READY, payload: user });
            }
        })

        return () => unsubscribe();
    }, []);

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}