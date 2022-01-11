import { Article1ServiceDetails } from "./Article1ServiceDetails";
import { Article1Options } from "./Article1Options";

import Button from "../Button";

// Styles
import styles from "../../styles/landing-page.module.css";

const Article1 = () => {
	return (
		<article className={styles["article1"]}>
			<Article1ServiceDetails />

			<section className={styles["article1-services"]}>
				<Article1Options
					img='/svg/one.svg'
					head={"Book appointment"}
					body={"Choose your doctor from our specialist in the hospital"}
				/>
				<Article1Options
					img='/svg/two.svg'
					head={"Upload Test Results"}
					body={
						"Get your medicines with our mobile application with a simple delivery system"
					}
				/>
				<Article1Options
					img='/svg/three.svg'
					head={"Get a Card"}
					body={
						"Free consultation with our trusted doctors and get the best recommendations"
					}
				/>
				<Article1Options
					img='/svg/four.svg'
					head={"Emergency care"}
					body={
						"You can get 24/7 urgent care for yourself or your children and your lovely family"
					}
				/>
			</section>

			<Button>Learn More</Button>
		</article>
	);
};

export default Article1;
