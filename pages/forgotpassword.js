import React from "react";
import styles from "../styles/Forgotpassword.module.css";

// Components
import OnboardingLayout from "../Layout/OnboardingLayout";

const forgotPassword = () => {
	return (
		<OnboardingLayout>
            <main>
                <div className={styles.heading}>
                    <p className={styles.title}>Forgot Password</p>
                </div>

                <div className={styles.big__container}>
                    <div className={styles.heading__info}>
                        <p className={styles.info}>Enter your student email and we’ll send you 
    a link to reset your password</p>
                    </div>

                    <div className={styles.form__container}>
                        <form className={styles.form}>
                            <div className={styles.mail}>
                                <label htmlFor="email">Student Email</label>
                                <input type="email" className={styles.mail__input} required></input>
                            </div>
                            
                            <div className={styles.reg}>
                                <label htmlFor="text">Registration Number</label>
                                <input type="text" className={styles.reg__input} required></input>
                                <p className={styles.number}>(Staff/Student’s Matric Number/UTME Number)</p>
                            </div>
                            
                            <p className={styles.form__text}>A verification code will be sent to the email address above.</p>

                            <button type="submit" className={styles.submit}>Get Code</button>
                        </form>
                    </div>

                    <div className={styles.footer}>
                        <span color="hsla(214, 35%, 21%, 1)" className={styles.sign__up}>Don&apos;t have an account?</span>
                        <span className={styles.sub__sign__up}>Sign Up</span>
                        <p className={styles.policy}>Terms of Use. Privacy policy</p>
                    </div>

                </div>
            </main>
        </OnboardingLayout>
    );
};   
export default forgotPassword;