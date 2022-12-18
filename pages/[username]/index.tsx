// NEXT
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
// COMPONENTS
import PostCard from '../../components/PostCard';
import ProfileCard from '../../components/ProfileCard';
// FIREBASE
import { findUserId, getPostsFromUser } from '../../util/firebaseFunctions';
import { Post } from '../../util/firebaseFunctions';
// STYLES
import styles from '../../styles/pages/UserProfile.module.scss';

// TYPES & INTERFACES
interface UserDocument {
    username: string;
    email: string;
}

type Posts = Post[] | null;
type User = UserDocument | null;
// type User = firebase.firestore.DocumentData[] | null;
// type Posts = firebase.firestore.DocumentData[] | null;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    // VARIABLES
    let user: User = null;
    let posts: Posts = null;
    const { username } = query;

    // Grab user data and their posts
    const userDocument = await findUserId(username as string);
    if ( userDocument ) {
        user = userDocument.data();
        posts = await getPostsFromUser(userDocument.id);
    }    


    return {
        props: {
            user: user,
            posts: posts,
        }
    }
}

const UserProfile: NextPage = ({ user, posts}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log(user, posts);
    return (
        <div className={styles.userProfilePage}>
            <PostCard post={{ title: 'This is a title' }}/>
            <ProfileCard user={user}/>
            <h1>{user.displayName}</h1>
        </div>
    );
}

export default UserProfile;