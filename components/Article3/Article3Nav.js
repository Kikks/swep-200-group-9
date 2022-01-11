// Styles
import styles from "../../styles/landing-page.module.css";

export const Article3Nav = () => {
	return (
		<section className={styles["article3-nav"]}>
			<img src='/svg/body-nav-previous.svg' alt='' />
			<div>
				<img src='/svg/body-nav.svg' alt='' />
				<img src='/svg/body-nav.svg' alt='' />
				<img src='/svg/body-nav.svg' alt='' />
				<img src='/svg/body-nav.svg' alt='' />
			</div>
			<img src='/svg/body-nav-next.svg' alt='' />
		</section>
	);
};
