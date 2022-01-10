import { useState, useEffect } from "react";
import Head from "next/head";
import { MdClose, MdLocationPin } from "react-icons/md";
import { BiError } from "react-icons/bi";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";

// Containers
import CheckAuth from "../../../containers/CheckAuth";

// Components
import Button from "../../../components/Button";
import Backdrop from "../../../components/Backdrop";
import Modal from "../../../components/Modal";
import TextArea from "../../../components/TextArea";

// Utils
import { getRequest, postRequest } from "../../../utils/api/calls";
import { GET_MY_EMERGENCIES, POST_EMERGENCY } from "../../../utils/api/urls";
import queryKeys from "../../../utils/api/queryKeys";

// Styles
import styles from "../../../styles/auth/student-emergency.module.css";

const categories = [
	"Accident",
	"Cardiac Arrest",
	"Breathing Problem",
	"Eye Trauma",
	"Fire Outbreak",
	"Haemorrhage",
	"Other"
];

const emptyErrors = {
	issue: "",
	voice_note: "",
	location: "",
	general: ""
};

const Emergency = () => {
	const { user } = useSelector(state => state.user);
	const [emergencies, setEmergencies] = useState([]);
	const [backdropIsOpen, setBackdropIsOpen] = useState(true);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [payload, setPayload] = useState({
		issue: "",
		voice_note: "https://audio.com",
		location: ""
	});
	const [errors, setErrors] = useState(emptyErrors);

	const { isLoading: emergencyLoading, refetch } = useQuery(
		queryKeys.getMyEmergencies,
		() =>
			getRequest({
				url: GET_MY_EMERGENCIES
			}),
		{
			onSuccess(data) {
				setEmergencies(data?.data?.emergencies || []);
				setBackdropIsOpen(false);
			},
			onError(error) {
				console.error(error?.response);
				setBackdropIsOpen(false);
			},
			enabled: !!user?._id
		}
	);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			position => {
				setPayload({
					...payload,
					location: `${position?.coords?.longitude || ""}, ${
						position?.coords?.latitude || ""
					}`
				});
			},
			error => {
				console.error(error);
			}
		);
	}, []);

	const { mutate, isLoading } = useMutation(postRequest, {
		onSuccess(data) {
			if (data?.data) {
				setIsSubmitted(true);
				refetch();
				setErrors({
					...emptyErrors
				});
			}
		},
		onError(error) {
			console.error(error?.response);
			setErrors({
				...emptyErrors,
				general:
					"Please refresh the page and enable your location when prompted."
			});
		}
	});

	const handleChange = event => {
		setPayload({
			...payload,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = () => {
		if (payload.issue.trim() === "") {
			setErrors({
				...emptyErrors,
				issue: "Issue must not be empty"
			});
		} else {
			mutate({
				url: POST_EMERGENCY,
				data: payload
			});
		}
	};

	return (
		<CheckAuth>
			<Head>
				<title>Emergency - Student</title>
			</Head>

			<div className={styles.container}>
				<h4 className='heading--4' style={{ textAlign: "center" }}>
					Emergencies
				</h4>

				<div className={`${styles.btn__container}`}>
					<Button onClick={() => setModalIsOpen(true)}>
						<span
							style={{
								fontSize: "2.5rem",
								marginTop: "-.5rem",
								marginRight: "2rem"
							}}
						>
							+
						</span>
						&nbsp; Add Emergency
					</Button>
				</div>

				<div className={`${styles.card} ${styles.emergency__container}`}>
					{emergencies.length === 0 ? (
						<div className={styles.empty__container}>
							<h6 className='bold heading--6'>
								You have not had an emergency.
							</h6>
						</div>
					) : (
						emergencies.map((emergency, index) => (
							<div key={index} className={styles.emergency}>
								<h6 className='heading--6 bold'>{emergency?.issue || ""}</h6>
								<div className={styles.emergency__details}>
									{emergency?.location && (
										<div className={styles.emergency__location__container}>
											<MdLocationPin
												size='2rem'
												color='#f74646'
												style={{ marginRight: "1rem" }}
											/>
											<span className={styles.emergency__location}>
												{`Longitude: ${
													emergency?.location.split(",")[0] || ""
												}, Latitude: ${
													emergency?.location.split(",")[1] || ""
												}`}
											</span>
										</div>
									)}

									{/* {emergency?.voice_note && (
										<Button>Listen to Voice Note</Button>
									)} */}
								</div>
							</div>
						))
					)}
				</div>
			</div>

			{(backdropIsOpen || emergencyLoading) && <Backdrop />}
			{modalIsOpen && (
				<Modal background='dark'>
					<div className={styles.modal__container}>
						<MdClose
							size='2.5rem'
							color='#777'
							onClick={() => {
								setIsSubmitted(false);
								setModalIsOpen(false);
							}}
							style={{ justifySelf: "flex-end", cursor: "pointer" }}
						/>
						{isSubmitted ? (
							<div className={styles.empty__container}>
								<h6 className='heading--6 bold'>
									Your emergency has been submitted; we will attend to you as
									soon as possible. Hang in there!
								</h6>
							</div>
						) : (
							<>
								<h4 className='heading--4 bold'>What is going on?</h4>

								{errors.general.trim() !== "" && (
									<div className={styles.general__error}>
										<BiError color='#fff' size='2.5rem' />
										<p>{errors.general}</p>
									</div>
								)}

								<TextArea
									placeholder='Breifly state your issue'
									label='Issue'
									name='issue'
									style={{ width: "100%" }}
									rows={4}
									value={payload.issue}
									onChange={event => handleChange(event)}
									error={errors.issue.trim() !== ""}
									helperText={errors.issue}
								/>

								<Button loading={isLoading} onClick={onSubmit}>
									Submit
								</Button>
							</>
						)}
					</div>
				</Modal>
			)}
		</CheckAuth>
	);
};

export default Emergency;
