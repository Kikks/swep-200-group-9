import { MdPerson } from "react-icons/md";

// Styles
import styles from "./Avatar.module.css";

const getInitials = string => {
	const names = string.split(" ");
	return `${names[0][0] || ""}${names[1][0] || ""}`.toUpperCase();
};

const Avatar = ({ label, image }) => (
	<div className={styles.avatar}>
		{label ? (
			<h4 className='heading--6 bold'>{getInitials(label)}</h4>
		) : (
			<MdPerson size='2.5rem' color='#fff' />
		)}

		{image && <img className={styles.image} src={image} alt='' />}
	</div>
);

export default Avatar;
