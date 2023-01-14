import { useContext, useState } from 'react';
// COMPONENT
import { AuthCheck } from '../../components/AuthCheck/AuthCheck';
// HOOKS
import { AuthContext } from '../../context/AuthContext';
import { useCollectionSnapshot } from '../../hooks/useCollectionSnapshot';
// FIREBASE
import { firestore } from '../../util/firebase';
// STYLES
import styles from '../../styles/pages/AdminPage.module.scss';

const AdminPage = () => {
    return (
        <div className="admin-page">
            <AuthCheck>
                <PostList />
            </AuthCheck>
        </div>
    );
}

export default AdminPage;

// COMPONENTS
const PostList = () => {
    // STATE & VARIABLES
    const [data, setData] = useState([]);
    const { user } = useContext(AuthContext);
    const postsRef = firestore.collection('users').doc(user.uid).collection('posts');
    const postsPath = postsRef.path;

    const unsubscribe = firestore.collection(postsPath).onSnapshot(snapshot => {
        let data = [];
        snapshot.docs.forEach(doc => {
            data.push({...doc.data()});
        })
        setData(data);  
    }, error => {
        console.log(error);
    });

    // const { colSnap: docs  } = useCollectionSnapshot(postsPath);
    // const posts = postsRef.get().then(snapshot => {
    //     let data = [];
    //     snapshot.docs.forEach(doc => {
    //         data.push({...doc.data()})
    //     })
    //     return data;
    // })

    // const [ data, setData] = useState([]);
    // const postsRef = firestore.collection('users').doc(user?.uid).collection('posts');
    // const postsPath = postsRef.path;
    // const postsQuery = postsRef.orderBy('createdAt', 'desc');
    // const posts = postsQuery.get().then(snapshot => {
    //     let data = [];
    //     snapshot.docs.forEach(doc => {
    //         console.log(doc.data());
    //         data.push({...doc.data()});
    //     })
    //     return data;
    // });
    // const postsSnap = postsRef
    // .onSnapshot(snapshot => {
    //     let data = [];
    //     snapshot.docs.forEach(doc => {
    //         console.log(doc.data());
    //         data.push({...doc.data()});
    //     })  
    //     // setData(data);
    //     return data;

    // });

    console.log(postsRef, data);
    
    return (
        <div>
            <h1>Post List Title</h1>
        </div>
    );
}

