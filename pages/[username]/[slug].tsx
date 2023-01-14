import { GetStaticProps, GetStaticPaths } from 'next';
// FIREBASE
import { findUserId, getPostFromUserAB } from '../../util/firebaseFunctions';
import type { Post } from '../../util/firebaseFunctions';
import { firestore } from '../../util/firebase';
// STYLES
import styles from '../../styles/pages/PostPage.module.scss';
import { useDocumentSnapshot } from '../../hooks/useDocumentSnapshot';

// TYPES & INTERFACES
interface PostPageProps {
    post: Post;
    postPath: string | null;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // VARIABLES
    const { username, slug } = params;
    let post: Post | null = null;
    let postPath: string | null = null;

    const userDocument = await findUserId(username as string);
    if ( userDocument) {
        // post = await getPostFromUser(userDocument.id, slug as string);
        [postPath, post] = await getPostFromUserAB(userDocument.id, slug as string);
    }

    return {
        props: { post, postPath },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    // VARIABLES
    const postsRef = firestore.collectionGroup('posts');
    const paths = await postsRef.get()
    .then(snapshot => {
        return snapshot.docs.map(doc => {
            const { username, slug } = doc.data();
            return { params: { username, slug } };
        })
    })

    return {
        paths,
        fallback: false
    }
}

const PostPage: React.FC<PostPageProps> = (props) => {
    // STATE & VARIABLES
    const { docSnapshot: postSnapshot } = useDocumentSnapshot(props.postPath);
    const post = postSnapshot || props.post;


    return (
        <div className={styles.postPage}>
            <h1>{post.title}</h1>
            <h2>{post.heartCount}</h2>
        </div>
    );
}

export default PostPage;