import { useContext, useState } from 'react';
// COMPONENT
import { AuthCheck } from '../../components/AuthCheck/AuthCheck';
import AdminPostList from '../../components/AdminPostList';
// FIREBASE
import { firestore, serverTimestamp } from '../../util/firebase';
// HOOKS
import { AuthContext } from '../../context/AuthContext';
import { useCollectionSnapshot } from '../../hooks/useCollectionSnapshot';
// LIBRARIES
import { useForm, SubmitHandler } from 'react-hook-form';
import { kebabCase } from 'lodash';
// STYLES
import styles from '../../styles/pages/AdminPage.module.scss';
import { useRouter } from 'next/router';

const AdminPage = () => {
    return (
        <div className={styles.adminPage}>
            <AuthCheck>
                <>
                    <CreatePost />
                    <AdminPosts />
                </>
            </AuthCheck>
        </div>
    );
}

export default AdminPage;

// COMPONENTS
const AdminPosts = () => {
    // STATE & VARIABLES
    const { user } = useContext(AuthContext);
    const { collectionSnapshot: posts } = useCollectionSnapshot(user.uid);
    
    return (
        <div className={styles.adminPosts}>
            <h1>Post List Title</h1>
            {/* {posts && posts.map(post => <AdminPostItem key={post.id} post={post} /> )} */}
            {/* <PostFeed posts={posts} /> */}
            <AdminPostList posts={posts} />
        </div>
    );
}

interface CreatePostForm {
    title: string;
}

const CreatePost = () => {
    // STATE & VARIABLES
    const {
        register,
        handleSubmit,
        watch, 
        formState: { errors }
    } = useForm<CreatePostForm>({ mode: "onChange", });
    const { user } = useContext(AuthContext);
    const [isPending, setIsPending] = useState<boolean>(false);
    const router = useRouter();

    // EVENTS
    const onSubmit: SubmitHandler<CreatePostForm> = async ({ title }) => {
        // Create a new post in firestore

        console.log('we are creating a new document');

        const slug = encodeURI(kebabCase(title));

        const docRef = firestore.collection("users").doc(user.uid)
        .collection("posts").doc(slug);

        const data = {
            title: title,
            slug: slug,
            published: false,
            content: "# hello world",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0,
        }

        setIsPending(true);

        await docRef.set(data, { merge: true });
        setIsPending(false);

        console.log('document was just submitted');
    }

    return (
        <div className={styles.createPostItem}>
            <form className="createPost" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Title of your post"
                    {...register("title", {
                        required: { value: true, message: "Title is required" },
                        minLength: { value: 3, message: "Title must be at least 3 characters" },
                        maxLength: { value: 20, message: "Title must be less than 20 characters" },
                        pattern: { value: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, message: "Title must be alphanumeric" }
                    })}
                />
                <button className="btn primary">Create new Post</button>
            </form>
        </div>
    )
}

