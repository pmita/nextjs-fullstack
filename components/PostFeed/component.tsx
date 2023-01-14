/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
// STYLES
import styles from './styles.module.scss';

const PostFeed = ({ posts }) => {
    return (
        posts
        ? (
            <div className={styles.postFeed}>
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        )
        : null
    );
    
}

export default PostFeed;

const PostCard = ({ post }) => {
    // STATE & VARIABLES
    const router = useRouter();
    // EVENTS
    const onClick = () => {
        router.push(`/${post.username}/${post.slug}`);
    }

    return (
        <div className={styles.postCard}>
            <div className={styles.postCardContent}>
                <h4>{post.content}</h4>
                <div className={styles.postCardCTA}>
                    {/* <Link href={`/${post.username}/${post.slug}`}>
                        Check me Out
                    </Link> */}
                    <button className='btn primary' onClick={onClick}>Check me Out</button>
                </div>
            </div>
            <div className={styles.postCardFooter}>
                <Link href={`/${post.username}`}>
                    <h6>@{post.username}</h6>
                </Link>
                <span>
                    <img src="/assets/icons/heart.svg" alt="heart icon" />
                </span>
            </div>
        </div>
    );
}
