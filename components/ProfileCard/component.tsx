/* eslint-disable @next/next/no-img-element */
// STYLES
import styles from './style.module.scss';

const ProfileCard = ({ user }) => {
    return (
        <div className={styles.profileCard}>
            <img 
                src="/assets/icons/hacker.png" 
                alt="Profile Picture"
                className={styles.profilePicture}
            />
            <h4 className={styles.userName}>{user.username}</h4>
        </div>
    );
}

export default ProfileCard;