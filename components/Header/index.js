import { HeaderNav } from "./HeaderNav";
import { HeaderBody } from "./HeaderBody";

// Styles
import styles from "../../styles/landing-page.module.css";

const Header = () => {
	return (
		<header className={styles.header}>
			<HeaderNav />
			<HeaderBody />
		</header>
	);
};

export default Header;
