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
            <h3>{post.content}</h3>
            <p>By @{post.username}</p>
        </div>
    );
}
