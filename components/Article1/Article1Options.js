// Styles
import styles from "../../styles/landing-page.module.css";

export const Article1Options = ({ img, head, body }) => {
	return (
		<div>
			<img className={styles["article1-service-icon"]} src={img} alt='icon' />
			<div className={styles["article1-service-details"]}>
				<h2 className="heading--5">{head}</h2>
				<p>{body}</p>
			</div>
		</div>
	);
};
