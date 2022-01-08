import Input from "../Input";
import Button from "../Button";

import styles from "../../styles/forgot-password.module.css";

const Form1 = ({ setIsBackdropOpen }) => {
	const onSubmit = event => {
		event.preventDefault();
		setIsBackdropOpen(true);
	};

	return (
		<form
			className={styles.form}
			style={{ marginTop: "5rem" }}
			onSubmit={onSubmit}
		>
			<Input
				placeholder='Enter your password'
				label='Password'
				type='password'
			/>
			<Input
				placeholder='Enter your password again'
				label='Confirm Password'
				type='password'
			/>
			<div className={styles.btn__container}>
				<Button onClick={onSubmit}>Done</Button>
			</div>
		</form>
	);
};

export default Form1;
