// Styles
import styles from "../../styles/landing-page.module.css";

export const Article3Body = () => {
	return (
		<section className={styles["article3-main-body"]}>
			<div className={styles["student"]}>
				<figure className={styles["iarticle3-mage-container"]}>
					<img
						className={styles["article3-image-container"]}
						src='/img/avatar-image.png'
						alt=''
					/>
				</figure>

				<div className={styles["student-details"]}>
					<p className={`${styles["student-name"]} heading--5 bold`}>Samuel Olufemi</p>
					<p className={styles["student-dept"]}>CSC student</p>
				</div>
			</div>

			<p className={styles["article3-main-review"]}>
				“Your dedicated patient engagement app and web portal allow me to access
				information instantaneously (no tedious form, long calls, or
				administrative hassle) and securely”
			</p>
		</section>
	);
};
