// import React, { useState, useEffect } from 'react';
// // FIREBASE
// import { fireStore } from '../util/firebase';
// // LIBRARIES
// import { debounce } from 'lodash';
// import { useForm } from 'react-hook-form';
// // STYTLING
// import styles from '../styles/pages/SignupPage.module.scss'

// interface UsernameForm {
//     username: string;
// }

// const UserPage = () => {
//     // STATE & VARIABLES
//     const [username, setUsername] = useState<string>("");
//     const [isAvailable, setIsAvailable] = useState<boolean>(false);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const { 
//         register, 
//         getValues, 
//         formState: {errors} 
//     } = useForm<UsernameForm>({ mode: 'onBlur' });

//     // EVENTS
//     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setUsername(e.target.value);
//     }

//     // FUNCTIONS
//     const checkUsername = debounce(async () => {
//         const username = getValues("username");
//         if (username.length > 3) {
//             const userRef = fireStore.collection('usernames').doc(username);
//             const { exists} = await userRef.get(); 
//             setIsAvailable(!exists);
//         }
//         console.log('debounce just fired');
//     }, 500);

//     // USEFFECTS
//     useEffect(() => {
//         checkUsername(username);
//     }, [username, checkUsername]);



//     return(
//         <div className={styles.signupPage}>
//             <form className={styles.signupForm}>
//                 <label>
//                     <input
//                         type="text"
//                         {...register('username', {
//                             required: { value: true, message: 'Username is required' },
//                             minLength: { value: 3, message: 'Username must be at least 4 characters' },
//                             maxLength: { value: 20, message: 'Username must be less than 20 characters' },
//                             pattern: { message: 'Username must not contain special characters', value: /^[a-zA-Z0-9]+$/ },
//                         })}
//                     />
//                 </label>
//                 {isAvailable 
//                     ? <p className={styles.inputError}>Username is available 👍</p>
//                     : <p className={styles.inputError}>Username is not available 🙅‍♀️</p>
//                 }
//                 {errors.username && <p className={styles.inputError}>{errors.username?.message}</p>}

//             </form>
//         </div>
//     )
// }

// export default UserPage;