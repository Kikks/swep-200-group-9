import React, { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

// Styles
import styles from "./Input.module.css";

const Input = props => {
	const [passwordShown, setPasswordShown] = useState(
		props.type === "password" ? false : true
	);

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

				<input
					{...props}
					className={styles.Input}
					type={passwordShown ? "text" : "password"}
				/>

				{props.type === "password" && (
					<>
						{passwordShown ? (
							<MdOutlineVisibility
								size='2.5rem'
								color='#777'
								style={{ cursor: "pointer" }}
								onClick={() => setPasswordShown(prevState => !prevState)}
							/>
						) : (
							<MdOutlineVisibilityOff
								size='2.5rem'
								color='#777'
								style={{ cursor: "pointer" }}
								onClick={() => setPasswordShown(prevState => !prevState)}
							/>
						)}
					</>
				)}
			</div>

			{props.helperText && (
				<span className={props.error ? styles.errorText : styles.helperText}>
					{props.helperText}
				</span>
			)}
		</div>
	);
};

export default Input;
