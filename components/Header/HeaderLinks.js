import Link from "next/link";

import { HeaderPagesNav } from "./HeaderPagesNav";

import Button from "../Button";

// Styles
import styles from "../../styles/landing-page.module.css";

export const HeaderLinks = () => {
	return (
		<div className={styles["nav-links"]}>
			<ul>
				<HeaderPagesNav link={"./home"} text={"Home"} />
				<HeaderPagesNav link={"./contact"} text={"Contact us"} />
				<HeaderPagesNav link={"./app"} text={"App"} />
				<HeaderPagesNav link={"./about-us"} text={"About us"} />
			</ul>

			<Link href='/login' passHref>
				<Button>Login</Button>
			</Link>
		</div>
	);
};
