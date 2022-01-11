// Component
import Button from "../Button";

// Styles
import styles from "../../styles/landing-page.module.css";

export const Article2First = () => {
	return (
		<section className={styles["article2-1"]}>
			<img src={"/img/article-2-image.jpg"} alt='' />

			<div className={styles["article2-text1"]}>
				<h3 className='heading--3 bold'>Leading healthcare providers</h3>
				<div></div>
				<p>
					Tanwine provides progressive, and affordable healthcare, accessible on
					mobile and online for every student.. To us, it’s not just work. We
					take pride in the solutions we deliver
				</p>

				<Button>Learn More</Button>
			</div>
		</section>
	);
};
