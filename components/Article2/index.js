// Styles
import styles from "../../styles/landing-page.module.css";

import { Article2First } from "./Article2First";
import { Article2Second } from "./Article2Second";

const Article2 = () => {
	return (
		<article className={styles["article2"]}>
			<Article2First />
			<Article2Second />
		</article>
	);
};

export default Article2;
