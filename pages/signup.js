import React from "react";
import reactDom, { findDOMNode } from "react-dom";
import Image from 'next/image'

// Components
import OnboardingLayout from "../Layout/OnboardingLayout";
import Input from "../Input";

//styles
import styles from '../styles/signup.module.css';

const addActive = () =>{
	return(
		<button className={styles.sign} id={styles['active']}></button>
	)
}

const Signup = () => {
	return (
		<OnboardingLayout>
			<div className={styles.container}>
				<div className={styles.text__container}>
					<button className={styles.sign} onClick={() => addActive()}  id={styles['active']}>Sign Up</button>
					<button className={styles.sign} onClick={()=> addActive()}>Sign In</button>
				</div>
				<div className={styles.form__container}>
					<form className={styles.form}>
						<div>
							<div className={styles.welcome}>Welcome to Tanwine!</div>
							<div className={styles.helper}>Create a new account</div>
						</div>
						
						<Input className={styles.Input} placeholder='Full Name'></Input>
						<Input className={styles.Input} placeholder='Registration Number'></Input>
						
						<div className={styles.password}>
						<Input className={styles.Input} placeholder='Password'></Input>
						<figure className={styles.svg__container}>
						<svg className={styles.svg} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M11.25 5H10.625V3.75C10.625 2.025 9.225 0.625 7.5 0.625C5.775 0.625 4.375 2.025 4.375 3.75V5H3.75C3.0625 5 2.5 5.5625 2.5 6.25V12.5C2.5 13.1875 3.0625 13.75 3.75 13.75H11.25C11.9375 13.75 12.5 13.1875 12.5 12.5V6.25C12.5 5.5625 11.9375 5 11.25 5ZM5.625 3.75C5.625 2.7125 6.4625 1.875 7.5 1.875C8.5375 1.875 9.375 2.7125 9.375 3.75V5H5.625V3.75ZM11.25 12.5H3.75V6.25H11.25V12.5ZM7.5 10.625C8.1875 10.625 8.75 10.0625 8.75 9.375C8.75 8.6875 8.1875 8.125 7.5 8.125C6.8125 8.125 6.25 8.6875 6.25 9.375C6.25 10.0625 6.8125 10.625 7.5 10.625Z" fill="#233348"/>
						</svg>
						</figure>
						</div>
						
						<div className={styles.password}>
						<Input className={styles.input__last} placeholder='Confirm Password'></Input>
						
						<figure className={styles.svg__container}>
						<svg className={styles.svg} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M11.25 5H10.625V3.75C10.625 2.025 9.225 0.625 7.5 0.625C5.775 0.625 4.375 2.025 4.375 3.75V5H3.75C3.0625 5 2.5 5.5625 2.5 6.25V12.5C2.5 13.1875 3.0625 13.75 3.75 13.75H11.25C11.9375 13.75 12.5 13.1875 12.5 12.5V6.25C12.5 5.5625 11.9375 5 11.25 5ZM5.625 3.75C5.625 2.7125 6.4625 1.875 7.5 1.875C8.5375 1.875 9.375 2.7125 9.375 3.75V5H5.625V3.75ZM11.25 12.5H3.75V6.25H11.25V12.5ZM7.5 10.625C8.1875 10.625 8.75 10.0625 8.75 9.375C8.75 8.6875 8.1875 8.125 7.5 8.125C6.8125 8.125 6.25 8.6875 6.25 9.375C6.25 10.0625 6.8125 10.625 7.5 10.625Z" fill="#233348"/>
						</svg>
						</figure>
						</div>
						
						<div className={styles.btn__container}>
						<button className={styles.btn}>
							Submit
						</button>
						</div>

						<div className={styles.line}></div>

						<div className={styles.form__footer}>
							<button className={styles.blue_text}>I already have an account? <button className={styles.text}>Sign in</button></button>
						</div>

						<div className={styles.term}>
							<span>Terms of use. Privacy policy</span>
						</div>
					</form>
			
				</div>
			</div>
		</OnboardingLayout>
	);
};

export default Signup;
