import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { BiError } from "react-icons/bi";

// Components
import OnboardingLayout from "../Layout/OnboardingLayout";
import Input from "../components/Input";
import Radio from "../components/Radio";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";

// Utils
import { postRequest } from "../utils/api/calls";
import { LOGIN } from "../utils/api/urls";
import { validateLoginInputs } from "../utils/validators";

// Store
import { login } from "../store/user";

//styles
import styles from "../styles/login.module.css";

const roles = ["student", "doctor"];

const emptyErrors = {
	general: "",
	registrationNumber: "",
	password: ""
};

const Login = () => {
	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const router = useRouter();
	const [payload, setPayload] = useState({
		role: "student",
		registrationNumber: "",
		password: ""
	});
	const [errors, setErrors] = useState(emptyErrors);
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		if (user) {
			router.push("/verification");
		}
	}, [user, router]);

	const onRadioChanged = event => {
		setPayload({
			...payload,
			role: event.target.value
		});
	};

	const { mutate, isLoading } = useMutation(postRequest, {
		onSuccess(data) {
			if (data?.data) {
				localStorage.setItem("token", data.data?.token);
				dispatch(login(data?.data?.user));
				setErrors(emptyErrors);
				router.push("/verification");
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
		const { valid, errors: validationErrors } = validateLoginInputs(payload);

		if (!valid) {
			setErrors({
				...emptyErrors,
				...validationErrors
			});
		} else {
			mutate({
				url: LOGIN,
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
					<p className='text-white' style={{ maxWidth: "28rem" }}>
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
					<span className='text-main-blue'>Sign in as</span>
				</div>

				<form className={styles.form} onSubmit={onSubmitHandler}>
					{errors.general.trim() !== "" && (
						<div className={styles.general__error}>
							<BiError color='#fff' size='2.5rem' />
							<p>{errors.general}</p>
						</div>
					)}
					<Input
						placeholder={
							payload.role === "doctor"
								? "Enter you ID"
								: "(Staff ID / Student Matric Number / UTME Number"
						}
						label={
							payload.role === "doctor" ? "Doctor's ID" : "Registration Number"
						}
						name='registrationNumber'
						value={payload.registrationNumber}
						onChange={event => handleChange(event)}
						error={errors.registrationNumber.trim() !== ""}
						helperText={errors.registrationNumber}
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

					<div className={styles.password__options}>
						<Checkbox
							checked={isChecked}
							label='Remember Password?'
							onChange={() => setIsChecked(prevState => !prevState)}
						/>

						<Link href='/forgot-password' passHref>
							<a className='text-main-blue link'>Forgot password?</a>
						</Link>
					</div>

					<div className={styles.btn__container}>
						<Button loading={isLoading}>Log in</Button>
					</div>
				</form>

				<div className={styles.signup__container}>
					<p>
						Don&apos;t have an account?{" "}
						<Link href='/signup' passHref>
							<a className='text-main-blue link'>Sign up</a>
						</Link>
					</p>
				</div>
			</div>
		</OnboardingLayout>
	);
};

export default Login;
