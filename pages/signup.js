import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { BiError } from "react-icons/bi";

// Components
import OnboardingLayout from "../Layout/OnboardingLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Modal from "../components/Modal";

// Utils
import { postRequest } from "../utils/api/calls";
import { REGISTER } from "../utils/api/urls";
import { validateSignUpInputs } from "../utils/validators";

//styles
import styles from "../styles/signup.module.css";

const emptyErrors = {
	firstName: "",
	lastName: "",
	registrationNumber: "",
	email: "",
	password: "",
	confirmPassword: "",
	checked: "",
	general: ""
};

const Signup = () => {
	const { user } = useSelector(state => state.user);
	const router = useRouter();
	const [payload, setPayload] = useState({
		firstName: "",
		lastName: "",
		email: "",
		registrationNumber: "",
		password: "",
		confirmPassword: ""
	});
	const [errors, setErrors] = useState(emptyErrors);
	const [isChecked, setIsChecked] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	useEffect(() => {
		if (user) {
			router.push("/verification");
		}
	}, [user, router]);

	const { mutate, isLoading } = useMutation(postRequest, {
		onSuccess(data) {
			if (data?.data) {
				setModalIsOpen(true);
				setErrors(emptyErrors);
			}
		},
		onError(error) {
			setErrors({
				...emptyErrors,
				general: error?.response?.data?.message
			});
		}
	});

	const handleChange = event => {
		setPayload({
			...payload,
			[event.target.name]: event.target.value
		});
	};

	const onSubmitHandler = event => {
		event.preventDefault();
		const { valid, errors: validationErrors } = validateSignUpInputs({
			...payload,
			checked: isChecked
		});

		if (!valid) {
			setErrors({
				...emptyErrors,
				...validationErrors
			});
		} else {
			mutate({
				url: REGISTER,
				data: payload
			});
		}
	};

	return (
		<OnboardingLayout
			image='/img/login.png'
			title='Virtual healthcare for you'
			body={
				<>
					<p className='text-white'>
						Experience better medical care with{" "}
						<span className='bold'>MedEase</span>
					</p>

					<p className='text-white'>
						<span className='bold'>Sign in</span> to continue with the
						experience
					</p>
				</>
			}
		>
			<div className={styles.container}>
				<h2 className='heading--2'>Welcome Back!</h2>

				<div className={styles.radio__container}>
					<span className='text-main-blue'>Register your account</span>
				</div>

				<form className={styles.form} onSubmit={onSubmitHandler}>
					{errors.general.trim() !== "" && (
						<div className={styles.general__error}>
							<BiError color='#fff' size='2.5rem' />
							<p>{errors.general}</p>
						</div>
					)}

					<Input
						placeholder='Enter you First Name'
						label='First Name'
						name='firstName'
						value={payload.firstName}
						onChange={event => handleChange(event)}
						error={errors.firstName.trim() !== ""}
						helperText={errors.firstName}
					/>
					<Input
						placeholder='Enter you Last Name'
						label='Last Name'
						name='lastName'
						value={payload.lastName}
						onChange={event => handleChange(event)}
						error={errors.lastName.trim() !== ""}
						helperText={errors.lastName}
					/>
					<Input
						placeholder='(Staff ID / Student Matric Number / UTME Number'
						label='Registration Number'
						name='registrationNumber'
						value={payload.registrationNumber}
						onChange={event => handleChange(event)}
						error={errors.registrationNumber.trim() !== ""}
						helperText={errors.registrationNumber}
					/>
					<Input
						placeholder='Enter you email'
						label='Email'
						name='email'
						value={payload.email}
						onChange={event => handleChange(event)}
						error={errors.email.trim() !== ""}
						helperText={errors.email}
					/>

					<Input
						placeholder='Enter your password'
						label='Password'
						type='password'
						name='password'
						value={payload.password}
						onChange={event => handleChange(event)}
						error={errors.password.trim() !== ""}
						helperText={errors.password}
					/>
					<Input
						placeholder='Enter your password again'
						label='Confirm Password'
						type='password'
						name='confirmPassword'
						value={payload.confirmPassword}
						onChange={event => handleChange(event)}
						error={errors.confirmPassword.trim() !== ""}
						helperText={errors.confirmPassword}
					/>

					<div className={styles.password__options}>
						<Checkbox
							checked={isChecked}
							label={
								<p style={{ textTransform: "none" }}>
									<span>By signing up, I agree to the </span>
									{""}
									<Link href='/signup' passHref>
										<a className='text-main-blue link'>terms and conditions</a>
									</Link>
								</p>
							}
							onChange={() => setIsChecked(prevState => !prevState)}
							error={errors.checked.trim() !== ""}
							helperText={errors.checked}
						/>
					</div>

					<div className={styles.btn__container}>
						<Button loading={isLoading}>Sign Up</Button>
					</div>
				</form>

				<div className={styles.signup__container}>
					<p>
						Already have an account?{" "}
						<Link href='/login' passHref>
							<a className='text-main-blue link'>Log in</a>
						</Link>
					</p>
				</div>
			</div>

			{modalIsOpen && (
				<Modal>
					<div className={styles.modal__container}>
						<Image
							src='/img/mark.png'
							alt='Mark image'
							height={88}
							width={88}
						/>

						<h4 className='heading--4'>Sign up Successful!</h4>

						<p>
							Please proceed to{" "}
							<Link href='/login' passHref>
								<a className='text-main-blue bold'>Log in</a>
							</Link>
						</p>
					</div>
				</Modal>
			)}
		</OnboardingLayout>
	);
};

export default Signup;
