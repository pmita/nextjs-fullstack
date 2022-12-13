import styles from './style.module.scss';
// NEXT.JS 
import Link from 'next/link';

const Navbar = () => {
    // STATE & VARIABLES
    const user = false;
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
                        <button className='btn secondary'>
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