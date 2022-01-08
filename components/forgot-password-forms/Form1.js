import { useState } from "react";
import { useMutation } from "react-query";

// Components
import Input from "../Input";
import Button from "../Button";

// Utils
import { postRequest } from "../../utils/api/calls";
import { SEND_VERIFICATION_CODE } from "../../utils/api/urls";
import { validateSendCodeInputs } from "../../utils/validators";

// Styles
import styles from "../../styles/forgot-password.module.css";

const emptyErrors = {
	email: "",
	regNo: "",
	general: ""
};

const Form1 = ({ onNextHandler }) => {
	const [payload, setPayload] = useState({
		email: "",
		regNo: ""
	});
	const [errors, setErrors] = useState(emptyErrors);

	const onChangeHandler = event => {
		setPayload({
			...payload,
			[event.target.name]: event.target.value
		});
	};

	const { mutate, isLoading } = useMutation(postRequest, {
		onSuccess(data) {
			if (data?.data) {
				onNextHandler();
				setErrors(emptyErrors);
			}
		},
		onError(error) {
			setErrors({
				...emptyErrors,
				general:
					error?.response?.data?.message || "An error occured. Try again later."
			});
		}
	});

	const onSubmit = event => {
		event.preventDefault();
		const { valid, errors: validationErrors } = validateSendCodeInputs(payload);

		if (!valid) {
			setErrors({
				...emptyErrors,
				...validationErrors
			});
		} else {
			mutate({
				url: SEND_VERIFICATION_CODE,
				data: payload
			});
		}
	};

	return (
		<form
			className={styles.form}
			style={{ marginTop: "5rem" }}
			onSubmit={onSubmit}
		>
			<Input
				placeholder='Enter your email'
				label='Email'
				helperText={
					errors.email.trim() !== ""
						? errors.email
						: "A verification code will be sent to the email above"
				}
				value={payload.email}
				name='email'
				onChange={event => onChangeHandler(event)}
				error={errors.email.trim() !== ""}
			/>
			<Input
				placeholder='(Staff ID / Student Matric Number / UTME Number'
				label='Registration Number'
				name='regNo'
				value={payload.regNo}
				onChange={event => onChangeHandler(event)}
				error={errors.regNo.trim() !== ""}
				helperText={errors.regNo}
			/>
			<div className={styles.btn__container}>
				<Button onClick={onSubmit} loading={isLoading}>
					Get Code
				</Button>
			</div>
		</form>
	);
};

export default Form1;
