// Styles
import styles from "../../styles/landing-page.module.css";

export const FooterNav = ({
	header,
	one: [onelink, oneText],
	two: [twoLink, twoText],
	three: [threeLink, threeText],
	four: [fourLink, fourText]
}) => {
	return (
		<section>
			<h3 className='heading--5 bold'>{header}</h3>
			<ul className={styles["footer-nav-list"]}>
				<li>
					<a href={onelink}>{oneText}</a>
				</li>
				<li>
					<a href={twoLink}>{twoText}</a>
				</li>
				<li>
					<a href={threeLink}>{threeText}</a>
				</li>
				<li>
					<a href={fourLink}>{fourText}</a>
				</li>
			</ul>
		</section>
	);
};
