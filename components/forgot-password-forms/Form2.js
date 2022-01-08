import Input from "../Input";
import Button from "../Button";

import styles from "../../styles/forgot-password.module.css";

const Form2 = ({ onNextHandler }) => {
	const onSubmit = event => {
		event.preventDefault();
		onNextHandler();
	};

	return (
		<form
			className={styles.form}
			style={{ marginTop: "5rem" }}
			onSubmit={onSubmit}
		>
			<h4
				className='heading--5'
				style={{ justifySelf: "center", textAlign: "center" }}
			>
				Verification code
			</h4>
			<Input placeholder='XXXX' label='Enter Verification Code' helperText='' />
			<div className={styles.btn__container}>
				<Button onClick={onSubmit}>Submit</Button>
			</div>
		</form>
	);
};

export default Form2;
