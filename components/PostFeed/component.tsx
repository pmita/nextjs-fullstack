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
            <div className={styles.postCardHeader}>
                <div className={styles.postCardAvatar}>
                    <img src='/assets/icons/hacker.png' alt='user icon' />
                </div>
                <div className={styles.postCardUsername}>
                    <h4>{post.username}</h4>
                    <Link href={`/${post.username}`}>
                        <h6>@{post.username}</h6>
                    </Link>
                </div>
            </div>
            <div className={styles.postCardTitle}>
                <h4>{post.title}</h4>
            </div>
            <div className={styles.postCardContent}>
                <h4>{post.content}</h4>
            </div>
            <div className={styles.postCardFooter}>
                <span className={styles.postCardHearts}>
                    <img src="/assets/icons/heart.svg" alt="heart icon" />
                </span>
                <span className={styles.postCardComments}>
                    <img src="/assets/icons/heart.svg" alt="heart icon" />
                </span>
            </div>
        </div>
    );
}
