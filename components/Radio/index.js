import styles from "./Radio.module.css";

const Radio = ({ label, className, ...rest }) => {
	return (
		<label className={`${styles.form__control} ${className || ""}`}>
			<input {...rest} type='radio' className={styles.input} />
			{label}
		</label>
	);
};

export default Radio;
