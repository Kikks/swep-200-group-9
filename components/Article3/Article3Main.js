import { Article3Head } from "./Article3Head";
import { Article3Body } from "./Article3Body";

// Styles
import styles from "../../styles/landing-page.module.css";

export const Article3Main = () => {
	return (
		<article className={styles["article3-main"]}>
			<Article3Head />
			<Article3Body />
		</article>
	);
};
