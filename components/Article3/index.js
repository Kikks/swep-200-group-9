import { Article3Main } from "./Article3Main";
import { Article3Nav } from "./Article3Nav";

// Styles
import styles from "../../styles/landing-page.module.css";

const Article3 = () => {
	return (
		<article className={styles["article3"]}>
			<Article3Main />
			<Article3Nav />
		</article>
	);
};

export default Article3;
