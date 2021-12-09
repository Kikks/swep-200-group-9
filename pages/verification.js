import React from "react";
import styles from "../styles/Verification.module.css";

// Components
import OnboardingLayout from "../Layout/OnboardingLayout";

const verification = () => {
	return (
		<OnboardingLayout>
            <main>
                <div className={styles.heading}>
                    <p className={styles.title}>Enter Verification Code</p>
                </div>

                <div className={styles.big__container}>
                    <div className={styles.heading__info}>
                        <p className={styles.info}>Check your student email and check the verification code sent to you</p>
                    </div>

                    <div className={styles.form__container}>
                        <form className={styles.form}>
                            <label htmlFor="text" className={styles.code}>Verification Code</label>
                            <input type="text" className={styles.code__input} required></input>
                            <button type="submit" className={styles.submit}>Done</button>
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
export default verification;