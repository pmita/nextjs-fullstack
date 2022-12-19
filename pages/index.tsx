import { useState } from 'react';
import { GetServerSideProps } from 'next';
// FIREBASE
import firebase from 'firebase';
import { firestore, fromMillis } from '../util/firebase';
import { getPostsFromCollectionGroup, Post } from '../util/firebaseFunctions';
// COMPONENTS
import PostFeed from '../components/PostFeed';
// STYLES
import styles from '../styles/pages/HomePage.module.scss';

const LIMIT = 5;

// TYPES & INTERFACES
type Posts = firebase.firestore.DocumentData[] | null;
interface HomePageProps {
  posts: Posts;
}

export const getServerSideProps:GetServerSideProps = async (context) => {
  // VARIABLES
  let posts: Posts = null;
  posts = await getPostsFromCollectionGroup('posts', LIMIT);

  return {
    props: {
      posts: posts,
    },
  };
}

const HomePage: React.FC<HomePageProps> = (props) => {
  // STATE & VARIABLES
  const [posts, setPosts] = useState(props.posts);
  const [isPending, setisPending] = useState<boolean>(false);
  const [postsEnd, setPostsEnd] = useState<boolean>(false);

  // EVENTS
  const loadMorePosts = async () => {
    setisPending(true)
    // Get last item
    const lastPost = posts[posts.length - 1];
    // convert createAt property to firestore timestamp
    const startAfter = typeof lastPost.createdAt === 'number' ? fromMillis(lastPost.createdAt) : lastPost.createdAt;
    try{
      const docsRef = firestore.collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(startAfter)
      .limit(LIMIT)
      const docs = await docsRef.get()
      .then(snapshot => {
        return snapshot.docs.map(doc => ({
          ...doc.data(),
          createdAt: doc.data().createdAt.toMillis(),
          updatedAt: doc.data().updatedAt.toMillis(),
        }))
      })

      setPosts(prevPost => [...prevPost, ...docs]);
      setisPending(false);

      if (docs.length < LIMIT) {
        setPostsEnd(true);
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.homePage}>
      <PostFeed posts={posts} />

      {!isPending && !postsEnd && (
        <button 
          className="btn secondary"
          onClick={loadMorePosts}
        >
          Load More
        </button>
      )}

      {postsEnd && <p className={styles.noMorePosts}>No more posts</p>}
    </div>
  );
}

export default HomePage;

