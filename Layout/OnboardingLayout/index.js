import React from "react";
import Image from "next/image";
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { GrMail } from "react-icons/gr";

// Styles
import styles from "./onboarding.module.css";

const OnboardingLayout = ({ children }) => {
	return (
		<main className={styles.container}>
			<div className={styles.svg__white__background}>
				<div className={styles.svg__container}>
					<div className={styles.logo__container}>
						<figure className={styles.logo}>
							<Image src='/img/logo.png' layout='fill' alt='logo' />
						</figure>
					</div>

					<div className={styles.svg__wrapper}>
						<figure className={styles.svg}>
							<Image
								src='/svg/onboarding.svg'
								layout='fill'
								alt='Onboarding Illustration'
							/>
						</figure>
					</div>

					<span>Copyright &copy; 2021. Tanwine All rights reserved</span>
				</div>
			</div>

			<div className={styles.form__blue__background}>
				<div className={styles.form__white__background}>
					<div className={styles.view}>{children}</div>

					<div className={styles.socials__container}>
						<FaFacebook size='2rem' />
						<BsInstagram size='2rem' />
						<AiFillTwitterCircle size='2rem' />
					</div>

					<div className={styles.contact__container}>
						<div className={styles.contact__item}>
							<FaPhoneAlt />
							<span>+234 813 000 0000</span>
						</div>

						<div className={styles.contact__item}>
							<GrMail size='2rem' />
							<span>swepgroup9@gmail.com</span>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default OnboardingLayout;
