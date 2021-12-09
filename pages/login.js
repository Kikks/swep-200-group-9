import React from "react";
import styles from "../styles/Login.module.css";
import { FaLock } from "react-icons/fa";
import { GrCheckbox } from "react-icons/gr";


// Components
import OnboardingLayout from "../Layout/OnboardingLayout";

export default function Login() {
	return (
		<OnboardingLayout>
			<main className={styles.main}>
				<section className={styles.navbar}>
					<nav className={styles.nav}>
						<ul className={styles.nav__ul}>
							<li className={styles.nav__li}><a href="" className={styles.nav__a1}>Sign In</a></li>
							<li className={styles.nav__li}><a href="" className={styles.nav__a2}>Sign Up</a></li>
						</ul>
					</nav>
				</section>
			
			
				<section className={styles.container}>
					<div className={styles.welcome__section}>
						<h1 className={styles.welcome}>Welcome Back!</h1>
						<p className={styles.small}>Sign in as</p>
						
						<div className={styles.checkbox}>
							<input type="checkbox" checked="checked"/><label className={styles.checkname}>Student</label>
						</div>
						<div className={styles.checkbox}>
							<input type="checkbox"/><label className={styles.checkname}>Doctor</label>
						</div>
					</div>

					<div>
						<form className={styles.form}>
							<div className={styles.reg__no}>
								<label htmlFor="name" className={styles.reg}>Registration Number</label>
								<input type="text" className={styles.reg__input} required></input>
								<p className={styles.number}>(Staff/Student’s Matric Number/UTME Number)</p>
							</div>
							
							<div className={styles.password__section}>
								<label htmlFor="password" className={styles.password}>Password</label>
								<input type="password" className={styles.pwd} required></input>
								<span className={styles.padlock}><FaLock /></span>
								<div className={styles.pwd__info}>
									<span className={styles.check}>
										<GrCheckbox />
									</span>
									<span className={styles.pwd__check}>Remember Password?</span>
									<span className={styles.pwd__forgot}>Forgot Password?</span>
									
								</div>
							</div>

							<button type="submit" className={styles.submit}>Sign In</button>									
						</form>
					</div>

					<div className={styles.footer}>
						<span color="hsla(214, 35%, 21%, 1)" className={styles.sign__up}>Don&apos;t have an account?</span>
						<span className={styles.sub__sign__up}>Sign Up</span>
						<p className={styles.policy}>Terms of Use. Privacy policy</p>
					</div>
				</section>
				
			</main>
			
		</OnboardingLayout>
	)
}