import { GetStaticProps, GetStaticPaths } from 'next';
// FIREBASE
import { findUserId, getPostFromUser, getPostsFromCollectionGroup, getPostFromUserAB } from '../../util/firebaseFunctions';
import type { Post } from '../../util/firebaseFunctions';
import { firestore } from '../../util/firebase';
import firebase from 'firebase';
// STYLES
import styles from '../../styles/pages/PostPage.module.scss';

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

const PostPage: React.FC<PostPageProps> = ({ post, postPath }) => {
    // STATE & VARIABLES
    console.log(postPath);

    return (
        <div className={styles.postPage}>
            <h1>{post.title}</h1>
        </div>
    );
}

export default PostPage;