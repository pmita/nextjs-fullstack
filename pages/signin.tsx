// LIBRARIES
import { useForm, SubmitHandler } from 'react-hook-form';
// HOOKS
import { useSignin } from '../hooks/useSignin';
// STYLES
import styles from '../styles/pages/SigninPage.module.scss';

interface SigninForm {
    email: string;
    password: string;
}

const SigninPage = () => {
    // STATE & VARIABLES
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<SigninForm>();
    const { signin } = useSignin();

    // EVENTS
    const onSubmit: SubmitHandler<SigninForm> = ({ email, password}) => {
        signin(email, password);
    }

    return(
        <div className={styles.signinPage}>
            <form className={styles.signinForm} onSubmit={handleSubmit(onSubmit)}>
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
                {errors.email && <p>{errors.email.message}</p>}
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
                {errors.password && <p>{errors.password.message}</p>}
                <button className="btn primary">Sign Up</button>
            </form>
        </div>
    );
}

export default SigninPage;
