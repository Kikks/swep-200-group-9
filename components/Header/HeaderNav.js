import Image from "next/image";

import { HeaderLinks } from "./HeaderLinks";

// Styles
import styles from "../../styles/landing-page.module.css";

export const HeaderNav = () => {
	return (
		<nav className={styles["header-nav"]}>
			<figure className={styles.logo__container}>
				<Image src='/img/logo--main.png' alt='' layout='fill' />
			</figure>
			<HeaderLinks />
		</nav>
	);
};
