import styles from "./Button.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Button = ({
	children,
	variant,
	loading,
	disabled,
	className,
	...rest
}) => {
	return (
		<button
			{...rest}
			className={`${styles.button} ${
				styles[`button--${variant || "main-blue"}`]
			} ${className || ""}`}
			disabled={loading || disabled}
		>
			{loading ? (
				<AiOutlineLoading3Quarters
					className={styles.loader}
					color='#fff'
					size='2rem'
				/>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
