import { BiDownArrowAlt } from "react-icons/bi";

// Components
import Button from "../Button";

// Styles
import styles from "../../styles/landing-page.module.css";

export const Article2Second = () => {
	return (
		<section className={styles["article2-2"]}>
			<div className={styles["article2-text2"]}>
				<h3 className='heading--3 bold'>Download our mobile apps</h3>
				<div></div>
				<p>
					Our dedicated patient engagement app and web portal allow you to
					access information instantaneously (no tedious form, long calls, or
					administrative hassle) and securely
				</p>

				<Button>
					Download
					<BiDownArrowAlt size='2rem' style={{ marginLeft: "1rem" }} />
				</Button>
			</div>

			<img src='/img/article-3-image.jpg' alt='' />
		</section>
	);
};
