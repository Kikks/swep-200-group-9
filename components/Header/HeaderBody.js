import Link from "next/link";

// Components
import Button from "../../components/Button";

// Styles
import styles from "../../styles/landing-page.module.css";

export const HeaderBody = () => {
	return (
		<div className={styles["header-body"]}>
			<div className={styles["header-body1"]}>
				<h1 className='heading--2 bold'>Virtual healthcare for you</h1>
				<p className="heading--6">
					Medease provides progressive, and affordable healthcare, accessible on
					mobile and online for students and the staff of OAU.
				</p>
				<div>
					<Link href='/login' passHref>
						<Button>Get Started</Button>
					</Link>
				</div>
			</div>

			<figure className={styles["header-image-container"]}>
				<img
					src='/img/header-image.jpg'
					className={styles["header-image"]}
					alt=''
				/>
			</figure>
		</div>
	);
};
