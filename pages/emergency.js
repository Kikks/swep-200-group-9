import React from "react";
import Image from "next/image";
import { BsPerson } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { FaStarOfLife } from "react-icons/Fa";
import { BiMicrophone } from "react-icons/Bi";


// Styles
import styles from "../styles/Emergency.module.css";

const OnboardingLayout = ({ }) => {
	return (
		<section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.nav__section}>
          <div className={styles.logo__container}>
            <figure className={styles.logo}>
              <Image src='/img/logo.png' layout='fill' alt='logo' />
            </figure>
          </div>
          <nav className={styles.nav}>
            <ul className={styles.ul}>
              <li className={styles.li}><a href="" className={styles.a}>Home</a></li>
              <li className={styles.li}><a href="" className={styles.a}>Contact Us</a></li>
              <li className={styles.li}><a href="" className={styles.a}>App</a></li>
              <li className={styles.li}><a href="" className={styles.a}>About Us</a></li>
            </ul>
          </nav>
          <div className={styles.profile}>
            <span className={styles.profile__icon}>
              <BsPerson />
            </span>
            <span className={styles.arrow__down}>
              <IoIosArrowDown />
            </span>
          </div>
        </div>
        <div className={styles.sub__header}>
          <div className={styles.star}>
            <FaStarOfLife />
          </div>
          <h1>Emergency?</h1>
        </div>
      </div>
 
      <div className={styles.emergency}>
        <div className={styles.emergence}>
          <h2>What is going on?</h2>
          <p>Please ensure your location is switched on on your device to enable swift location tracking</p>
        </div>
        <div className={styles.emergency__info}>
          <div className={styles.suggest}>
            <p>Quick Suggestion</p>
              
            <div className={styles.select}>
              <select className={styles.select__categories}>
                <option value="1">Accident</option>
                <option value="2">Cardiac Arrest</option>
                <option value="3">Sudden Breathing Problem</option>
                <option value="4">Eye Trauma</option>
              </select>
            </div>

          </div>
          <div className={styles.speak}>
            <p>Want to Speak?</p>
            <span>
              <div className={styles.microphone}>
                <BiMicrophone />
              </div>
            </span>
          </div>
            
        </div>
        <div className={styles.send}>
          <button className={styles.send__btn}>Send</button>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.copyright}>
          <div className={styles.logo__container}>
            <figure className={styles.logo}>
              <Image src='/img/logo.png' layout='fill' alt='logo' />
            </figure>
          </div>
            <p>Tanwine provides progressive, and affordable healthcare, accessible on mobile and online for everyone</p>
            <p>©Trafalgar PTY LTD 2020. All rights reserved</p>
        </div>
        <div className={styles.company}>
          <h3>Company</h3>
          <p>About</p>
          <p>Testimonials</p>
          <p>Find a doctor</p>
          <p>Apps</p>
        </div>
        <div className={styles.region}>
          <h3>Region</h3>
          <p>school1</p>
          <p>school2</p>
          <p>school3</p>
          <p>school4</p>
        </div>
        <div className={styles.help}>
          <h3>Help</h3>
          <p>Help center</p>
          <p>Contact support</p>
          <p>Instructions</p>
          <p>How it works</p>
        </div>
      </footer>
		</section>
	);
};
export default OnboardingLayout;