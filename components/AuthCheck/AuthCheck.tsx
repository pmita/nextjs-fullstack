import Link from "next/link";
import { useContext } from "react";
// CONTEXT
import { AuthContext } from "../../context/AuthContext";

type Props = {
    children: JSX.Element;
}

export const AuthCheck = ({ children }: Props) => {
    // STATE & VARIABLES
    const { user } = useContext(AuthContext);

    return user 
        ? children
        : <Link href="/signin">Sign In</Link>
}