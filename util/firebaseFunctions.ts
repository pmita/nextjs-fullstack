// FIREBASE
import firebase from 'firebase';
import { firestore } from '../util/firebase';

interface Post {
    title: string;
    createdAt: number;
    updatedAt: number;
    heartCount: number;
    published: boolean;
    content: string;
    slug: string;
    uid: string;
    username: string;
}

const findUserId = async (
    username: string
): Promise<firebase.firestore.DocumentData> => {
    const userRef = firestore.collection('users')
    .where('username', '==', username).limit(1);
    const userDocument = (await userRef.get()).docs[0];
    return userDocument as firebase.firestore.DocumentData;
}


const getPostFromUser = async (
    userId: string, 
    slug: string
): Promise<Post> => {
    const postRef = firestore.collection('users').doc(userId)
    .collection('posts').doc(slug);
    const postDoc = await postRef.get()
    .then(doc => {
        return {
            ...doc.data(),
            createdAt: doc.data().createdAt.toMillis(),
            updatedAt: doc.data().updatedAt.toMillis(),
        }
    })
    return postDoc as unknown as Post;
}

const getPostFromUserAB = async (
    userId: string, 
    slug: string
): Promise<[string, Post]> => {
    const postRef = firestore.collection('users').doc(userId)
    .collection('posts').doc(slug);
    const postPath = postRef.path;
    const postDoc = await postRef.get()
    .then(doc => {
        return {
            ...doc.data(),
            createdAt: doc.data().createdAt.toMillis(),
            updatedAt: doc.data().updatedAt.toMillis(),
        }
    })
    return [postPath, postDoc as unknown as Post];
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

const getMorePostsFromCollectionGroup = async (
    startAfter: firebase.firestore.Timestamp, 
    limit: number
 ): Promise<firebase.firestore.DocumentData[]> => {
    const docsRef = firestore.collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .startAfter(startAfter)
    .limit(limit);
    const docs = await docsRef.get()
    .then(snapshot => {
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            createdAt: doc.data().createdAt.toMillis(),
            updatedAt: doc.data().updatedAt.toMillis(),
        }))
    })
    return docs as firebase.firestore.DocumentData[];
}

// EXPORT TYPES
export type { Post };
// EXPORT FUNCTIONS
export { 
    findUserId, 
    getPostFromUser,
    getPostsFromUser, 
    getPostsFromCollectionGroup,
    getPostFromUserAB,
    getMorePostsFromCollectionGroup
};