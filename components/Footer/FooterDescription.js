import Image from "next/image";

// Styles
import styles from "../../styles/landing-page.module.css";

export const FooterDescription = () => {
	return (
		<article className={styles["footer-description"]}>
			<figure className={styles.logo__container}>
				<Image src='/img/logo--light.png' alt='' layout='fill' />
			</figure>

			<section className={styles["footer-text"]}>
				<p>
					Tanwine provides progressive, and affordable healthcare, accessible on
					mobile and online for everyone
				</p>
			</section>
		</article>
	);
};
