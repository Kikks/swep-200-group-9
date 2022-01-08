import React from "react";
import Image from "next/image";

// Styles
import styles from "./onboarding.module.css";

const OnboardingLayout = ({ title, body, image, children }) => {
	return (
		<main className={styles.container}>
			<div
				className={styles.intro__container}
				style={{
					background: `linear-gradient(
			to top,
			rgba(69, 143, 246, 0.8),
			rgba(69, 143, 246, 0.8)
		),
		url(${image})`
				}}
			>
				<div className={styles.logo__container}>
					<figure className={styles.logo}>
						<Image src='/img/logo--light.png' layout='fill' alt='logo' />
					</figure>
				</div>

				<div className={styles.content}>
					<h6 className={`text-white bold ${styles.title}`}>{title}</h6>
					{body}
				</div>

				<span className='text-white'>
					Copyright &copy; 2021. Tanwine All rights reserved
				</span>
			</div>

			<div className={styles.children__container}>
				<div className={styles.view}>{children}</div>
			</div>
		</main>
	);
};

export default OnboardingLayout;
