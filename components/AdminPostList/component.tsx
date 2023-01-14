import styles from './styles.module.scss';

const AdminPostList = ({ posts }) => {
  return (
    <div className={styles.postsList}>
      {posts 
        ? posts.map(post => <AdminPostItem key={post.id} item={post} />)
        : <div>No Posts Yet</div>
      }
    </div>
  );
}

export default AdminPostList;

const AdminPostItem = ({ item }) => {
  return (
    <div className={styles.postItem}>
      <h4>{item.title}</h4>
      <div className={styles.cta}>
        <button className="btn primary">Edit me</button>
        {item.published 
          ? <button className="btn secondary">Unpublish</button>
          : <button className="btn primary">Publish</button>
        }
      </div>
    </div>
  );
}