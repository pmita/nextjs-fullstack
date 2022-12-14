import React, { useContext } from 'react';
// NEXT.JS 
import Link from 'next/link';
// CONTEXT
import { AuthContext } from '../../context/AuthContext';
// HOOKS
import { useSignout } from '../../hooks/useSignout';
// STYLES
import styles from './style.module.scss';

const Navbar = () => {
    // STATE & VARIABLES
    const { user } = useContext(AuthContext); 
    const { signout } = useSignout();
    return(
        <nav className={styles.navigation}>
            <div className={styles.brand}>
                <Link href="/" className={styles.brandLogo}>
                    <h2>Twatter .</h2>
                </Link>
            </div>

            <div className={styles.callToAction}>
                {user && (
                    <>
                        <button className="btn primary">
                            <Link href="/create">
                                Create Story
                            </Link>
                        </button>
                        <button className='btn secondary' onClick={signout}>
                            Sign Out
                        </button>
                    </>
                )}
                {!user && (
                    <>
                        <button className="btn primary">
                            <Link href="/signin">
                                Sign In
                            </Link>
                        </button>
                        <button className='btn secondary'>
                            <Link href="/signup">
                                Sign Up
                            </Link>
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;