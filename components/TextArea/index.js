import React from "react";

// Styles
import styles from "./TextArea.module.css";

const TextArea = props => {
	return (
		<div
			className={styles.input__wrapper}
			style={props.style ? props.style : {}}
		>
			<div
				className={`${styles.input__container} ${
					props.className ? props.className : ""
				} ${props.error ? styles.input__container__error : ""}`}
			>
				<span className={styles.label}>{props.label}</span>

				<textarea rows={7} {...props} className={styles.Input} />
			</div>

			{props.helperText && (
				<span className={props.error ? styles.errorText : styles.helperText}>
					{props.helperText}
				</span>
			)}
		</div>
	);
};

export default TextArea;
