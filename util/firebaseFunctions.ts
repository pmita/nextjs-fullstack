// FIREBASE
import { firestore } from '../util/firebase';
import firebase from 'firebase';

interface Post {
    title: string;
    createdAt: any;
    updatedAt: any;
    heartCount: number;
    published: boolean;
    content: string;
    slug: string;
    uid: string;
    username: string;
}

const findUserId = async (username: string): Promise<firebase.firestore.DocumentData> => {
    const userRef = firestore.collection('users')
    .where('username', '==', username).limit(1);
    const userDocument = (await userRef.get()).docs[0];
    return userDocument as firebase.firestore.DocumentData;
}


const getPostsFromUser = async (userId: string): Promise<Post[]> => {
    const postsRef = firestore.collection('users').doc(userId)
    .collection('posts').orderBy('createdAt', 'desc');
    const postsDocuments = await postsRef.get()
    .then(snapshot => {
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            createdAt: doc.data().createdAt.toMillis(),
            updatedAt: doc.data().updatedAt.toMillis(),
        }))
    })
    return postsDocuments as Post[];
}

// EXPORT TYPES
export type { Post };
// EXPORT FUNCTIONS
export { findUserId, getPostsFromUser };