import Head from "next/head";

// Components
import Header from "../components/Header";
import Article1 from "../components/Article1";
import Article2 from "../components/Article2";
import Article3 from "../components/Article3";
import Footer from "../components/Footer";

// Styles
import styles from "../styles/landing-page.module.css";

const Home = () => {
	return (
		<div className={styles.div}>
			<Head>
				<title>Welcome to Medease</title>
			</Head>

			<Header />
			<main className={styles.main}>
				<Article1 />
				<Article2 />
				<Article3 />
			</main>
			<Footer />
		</div>
	);
};

export default Home;
