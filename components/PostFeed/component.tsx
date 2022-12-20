import Link from 'next/link';
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
    return (
        <div className={styles.postCard}>
            <div className={styles.postCardContent}>
                <h4>{post.content}</h4>
            </div>
            <div className={styles.postCardFooter}>
                <span>❤️ {post.heartCount}</span>
                <Link href={`/${post.username}`}>
                    <h6>By {post.username}</h6>
                </Link>
            </div>
        </div>
    );
}
