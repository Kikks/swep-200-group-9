import styles from "./Checkbox.module.css";

const Checkbox = ({ label, className, helperText, error, ...rest }) => {
	return (
		<div className={styles.checkbox__container}>
			<label className={`${styles.form__control} ${className || ""}`}>
				<input {...rest} type='checkbox' className={styles.input} />
				{label}
			</label>

			{helperText && (
				<span className={error ? styles.errorText : styles.helperText}>
					{helperText}
				</span>
			)}
		</div>
	);
};

export default Checkbox;
