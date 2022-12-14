import React, { useEffect } from 'react';
// HOOKS
import { useSignup } from '../hooks/useSignup';
import { useDoesDocExist } from '../hooks/useDoesDocExist';
// LIBRARIES
import { useForm, SubmitHandler } from 'react-hook-form';
// STYLES
import styles from '../styles/pages/SignupPage.module.scss';

interface SignupForm {
    email: string;
    password: string;
    username: string;
}

const SignupPage = () => {
    // STATE & VARIABLES
    const { 
        register, 
        handleSubmit, 
        watch,
        formState: { errors } 
    } = useForm<SignupForm>({ mode: "onBlur", reValidateMode: "onChange" });
    const { signup } = useSignup();
    // const [isAvailable, setIsAvailable] = useState<boolean>(false);
    const username = watch("username");
    const { doesDocumentExist, isAvailable } = useDoesDocExist(`usernames/${username}`);

    // EVENTS
    const onSubmit: SubmitHandler<SignupForm> = async ({ email, password, username }) => {
        if(isAvailable){
            signup(email, password, username);
        }
    }

    // USEEFFECTS
    useEffect(() => {
        doesDocumentExist();

        return () => doesDocumentExist.cancel();
    }, [doesDocumentExist, username]);

    return(
        <div className={styles.signupPage}>
            <form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>Email</span>
                    <input type="email" {...register(
                        "email",
                        {
                            required: {value: true, message: "Email is required"},
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        }
                        )}/>
                </label>
                {errors.email && <p className={styles.inputError}>{errors.email.message}</p>}
                <label>
                    <span>Password</span>
                    <input type="password" {...register(
                        "password",
                        {
                            required: {value: true, message: "Password is required"},
                            minLength: {
                                value: 3,
                                message: "password must be at least 3 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "password must be less than 20 characters"
                            }
                        }
                        )}/>
                </label>
                {errors.password && <p className={styles.inputError}>{errors.password.message}</p>}
                <label>
                    <span>Username</span>
                    <input type="text" {...register(
                        "username",
                        {
                            required: {value: true, message: "Username is required"},
                            minLength: {
                                value: 3,
                                message: "username must be at least 3 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "username must be less than 20 characters"
                            }
                        }
                        )}/>
                </label>
                {errors.username && <p className={styles.inputError}>{errors.username.message}</p>}
                {(username?.length > 3 && !isAvailable) && <p className={styles.inputError}>Username is not available</p>}
                <button className="btn primary">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupPage;
