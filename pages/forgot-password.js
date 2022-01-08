import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import OnboardingLayout from "../Layout/OnboardingLayout";
import Modal from "../components/Modal";
import Forms from "../components/forgot-password-forms";

//styles
import styles from "../styles/forgot-password.module.css";

const Login = () => {
	const [formNumber, setFormNumber] = useState(1);
	const [isBackdropOpen, setIsBackdropOpen] = useState(false);

	const onNextHandler = () => {
		setFormNumber(prevState => prevState + 1);
	};

	return (
		<OnboardingLayout
			image='/img/forgot-password.png'
			title='Are you stranded?'
			body={
				<>
					<p className='text-white'>
						Don&apos;t worry, we&apos;ve got you covered
					</p>
				</>
			}
		>
			<div className={styles.container}>
				<h2 className={`${styles.title} heading--2`}>Forgot Password?</h2>

				<p className={styles.subtitle}>
					Enter your email and we&apos;ll send you a link to reset your password
				</p>

				<Forms {...{ formNumber, onNextHandler, setIsBackdropOpen }} />

				<div className={styles.signup__container}>
					<p>
						Don&apos;t have an account?{" "}
						<Link href='/signup' passHref>
							<a className='text-main-blue link'>Sign up</a>
						</Link>
					</p>
				</div>
			</div>

			{isBackdropOpen && (
				<Modal>
					<div className={styles.modal__container}>
						<Image
							src='/img/mark.png'
							alt='Mark image'
							height={88}
							width={88}
						/>

						<h4 className='heading--4'>Password Reset Successful!</h4>

						<p>
							Please proceed to{" "}
							<Link href='/login' passHref>
								<a className='text-main-blue bold'>Log in</a>
							</Link>
						</p>
					</div>
				</Modal>
			)}
		</OnboardingLayout>
	);
};

export default Login;
