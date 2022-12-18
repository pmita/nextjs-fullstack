// STYLES
import styles from './styles.module.scss';

const PostCard = ({ post }) => {
    return (
        <div className={styles.postCard}>
            <h1>Post is Ok</h1>
            <p>{post.title}</p>
        </div>
    );
}

export default PostCard;