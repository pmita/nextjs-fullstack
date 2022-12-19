// FIREBASE
import firebase from 'firebase';
import { firestore } from '../util/firebase';

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
    .collection('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(5);
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

const getPostsFromCollectionGroup = async (
    collectionName: string, 
    limit: number
): Promise<firebase.firestore.DocumentData[]> => {
    const docsRef = firestore.collectionGroup(collectionName)
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(limit);
    const docs = await docsRef.get()
    .then(snapshot => {
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            createdAt: doc.data().createdAt.toMillis(),
            updatedAt: doc.data().updatedAt.toMillis(),
        }))
    })
    return docs as unknown as firebase.firestore.DocumentData[];
}

// EXPORT TYPES
export type { Post };
// EXPORT FUNCTIONS
export { findUserId, getPostsFromUser, getPostsFromCollectionGroup };