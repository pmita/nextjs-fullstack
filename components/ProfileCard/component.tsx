// STYLES
import styles from './style.module.scss';

const ProfileCard = ({ user }) => {
    return (
        <div className={styles.profileCard}>
            <h1>User name is this one</h1>
            <h4>{user.displayName}</h4>
        </div>
    );
}

export default ProfileCard;