import React from "react";
// components
import Image from "next/dist/client/image";
import OnboardingLayout from "../Layout/OnboardingLayout";

//styles
import styles from '../styles/signupFeedback.module.css'

const SignupFeedback = () =>{
    return(
        <OnboardingLayout>
            <div className={styles.image__container}>
                <figure className={styles.img}>
                 <Image styles={{position: 'absolute'}}  alt="img" src="/img/tick.png" layout="fill"></Image>
                </figure>
            </div>
            <div className={styles.alltext}>
                <p className={styles.text1}>CONGRATULATIONS!</p>
            </div>
            <div className={styles.alltext}>
                <p className={styles.text2}>Account created successfully</p>
            </div>
            <div className={styles.alltext}>
                <button className={styles.svg__button}>
                    <div className={styles.text3}>Continue to Sign in</div>
                    <svg className={styles.svg}width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.73775 11.2371L24.7837 11.2371L20.1599 15.8608C19.5222 16.4986 19.5222 17.4552 20.1599 18.093C20.7977 18.7307 21.7543 18.7307 22.3921 18.093L29.7263 10.7588C30.364 10.121 30.364 9.1644 29.7263 8.52664L22.3921 1.19246C21.7543 0.554706 20.7977 0.554706 20.1599 1.19246C19.5222 1.83022 19.5222 2.78685 20.1599 3.4246L24.7837 8.04833L3.73775 8.04833C2.94056 8.04833 2.14336 8.68608 2.14336 9.64271C2.14336 10.5993 2.94056 11.2371 3.73775 11.2371Z" fill="#233348"/>
                    </svg>
                </button>

            </div>
        </OnboardingLayout>
    )
}

export default SignupFeedback;