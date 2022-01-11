import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";
import { FaFileAlt } from "react-icons/fa";
import {
	MdDelete,
	MdOutlineFileDownload,
	MdOutlineFileUpload
} from "react-icons/md";
import axios from "axios";

// Container
import CheckAuth from "../../../containers/CheckAuth";

// Components
import Button from "../../../components/Button";
import Backdrop from "../../../components/Backdrop";
import CircularProgress from "../../../components/CircularProgress";
import Modal from "../../../components/Modal";

// Utils
import { getRequest, postRequest } from "../../../utils/api/calls";
import {
	GET_USER_VERIFICATION_PROFILE_TWO,
	UPLOAD_IMAGE,
	UPLOAD_VERIFICATION_PROFILE_TWO
} from "../../../utils/api/urls";
import queryKeys from "../../../utils/api/queryKeys";

//styles
import styles from "../../../styles/auth/verification.module.css";

const imageState = {
	url: "",
	loading: false,
	error: false
};

const isEmpty = string => {
	if (string.trim() === "") return true;
	else return false;
};

const isNotUploaded = ({ url, loading }) => {
	if (isEmpty(url) && !loading) return true;
	else return false;
};

const UploadedImage = ({ title, state, stateSetter }) => {
	return isEmpty(state.url) ? (
		<></>
	) : (
		<div className={styles.uploaded__image}>
			<FaFileAlt size='1.8rem' color='var(--main-blue)' />
			<span className='bold'>{title}</span>
			<a href={state.url} target='_blank' rel='noreferrer'>
				<MdOutlineFileDownload
					size='2.2rem'
					color='#000'
					style={{ cursor: "pointer" }}
				/>
			</a>
			<MdDelete
				size='2rem'
				color='var(--error)'
				onClick={() => stateSetter({ ...state, url: "" })}
				style={{ cursor: "pointer" }}
			/>
		</div>
	);
};

const UploadingImage = ({ loading, title }) =>
	!loading ? (
		<></>
	) : (
		<div className={styles.uploading__image}>
			<CircularProgress size='2rem' color='var(--main-blue)' />
			<span className='bold'>{title}</span>
		</div>
	);

const UploadImage = ({
	notUploaded,
	state,
	stateSetter,
	title,
	handleImageChange
}) => {
	return !notUploaded ? (
		<></>
	) : (
		<div className={styles.upload__image}>
			<FaFileAlt size='1.8rem' color='var(--main-blue)' />
			<span className='bold'>{title}</span>
			<label htmlFor={`${title}-image`}>
				<MdOutlineFileUpload
					size='2.2rem'
					color='#000'
					style={{ cursor: "pointer" }}
				/>
				<input
					type='file'
					onChange={event => handleImageChange({ event, state, stateSetter })}
					accept='/image/*'
					id={`${title}-image`}
					name={`${title}-image`}
					className={styles.input}
				/>
			</label>
			{state.error && (
				<div className={styles.upload__error}>
					<span>Please try again</span>
				</div>
			)}
		</div>
	);
};

const Verification = () => {
	const { user } = useSelector(state => state.user);
	const router = useRouter();
	const [profile, setProfile] = useState({
		status: "declined",
		comments: []
	});
	const [backdropIsOpen, setBackdropIsOpen] = useState(true);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [eye_test_result, set_eye_test_result] = useState(imageState);
	const [ecg_test_result, set_ecg_test_result] = useState(imageState);
	const [urine_test_result, set_urine_test_result] = useState(imageState);
	const [hermatology_test_result, set_hermatology_test_result] =
		useState(imageState);

	const { isLoading, refetch } = useQuery(
		queryKeys.getUserVerificationProfileTwo,
		() =>
			getRequest({
				url: GET_USER_VERIFICATION_PROFILE_TWO({ id: user?._id || "" })
			}),
		{
			onSuccess(data) {
				setProfile(
					data?.data?.profile || {
						status: "declined",
						comments: []
					}
				);
				setBackdropIsOpen(false);

				if (data?.data?.profile?.eye_test_result) {
					set_eye_test_result({
						...eye_test_result,
						url: data.data.profile.eye_test_result
					});
				}

				if (data?.data?.profile?.ecg_test_result) {
					set_ecg_test_result({
						...ecg_test_result,
						url: data.data.profile.ecg_test_result
					});
				}

				if (data?.data?.profile?.urine_test_result) {
					set_urine_test_result({
						...urine_test_result,
						url: data.data.profile.urine_test_result
					});
				}

				if (data?.data?.profile?.hermatology_test_result) {
					set_hermatology_test_result({
						...hermatology_test_result,
						url: data.data.profile.hermatology_test_result
					});
				}
			},
			onError(error) {
				console.error(error?.response);
				setBackdropIsOpen(false);
			},
			enabled: !!user?._id,
			refetchOnWindowFocus: false
		}
	);

	const { mutate: uploadDocuments, isLoading: uploadDocumentsIsLoading } =
		useMutation(postRequest, {
			onSuccess(data) {
				refetch();
				setBackdropIsOpen(false);
				setModalIsOpen(true);
			},
			onError(error) {
				console.log(error?.response);
			}
		});

	const uploadImage = (url, formData, stateSetter) => {
		axios
			.post(url, formData)
			.then(res => {
				const secureUrl = res.data?.secure_url;
				stateSetter({
					url: secureUrl,
					loading: false,
					error: false
				});
			})
			.catch(err => {
				stateSetter({
					url: "",
					error: true,
					loading: false
				});
				console.error(err?.response);
			});
	};

	const handleImageChange = ({ event, state, stateSetter }) => {
		console.log("i came here");
		const data = new FormData();
		data.append("file", event?.target?.files[0] || "");
		data.append("upload_preset", "medease");
		uploadImage(UPLOAD_IMAGE, data, stateSetter);
		stateSetter({
			...state,
			loading: true
		});
	};

	const onClickHandler = () => {
		uploadDocuments({
			url: UPLOAD_VERIFICATION_PROFILE_TWO({ id: user?._id || "" }),
			data: {
				eye_test_result: eye_test_result.url,
				ecg_test_result: ecg_test_result.url,
				urine_test_result: urine_test_result.url,
				hermatology_test_result: hermatology_test_result.url
			}
		});
	};

	return (
		<CheckAuth>
			{isLoading ? (
				<div
					style={{
						width: "100%",
						height: 200,
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<CircularProgress />
				</div>
			) : (
				<div className={styles.container}>
					<h4 className='heading--4' style={{ textAlign: "center" }}>
						Test Results
					</h4>

					<div className={styles.profile__container}>
						<div className={styles.heading__container}>
							{profile.status === "complete" ||
							profile.comments.length === 0 ? (
								<div className={styles.profile__comment} />
							) : (
								<span className={`bold ${styles.profile__comment}`}>
									Comment(s):
								</span>
							)}

							<div className={styles.status__container}>
								<span className='bold'>Verification status:</span>

								<div
									className={`${styles.status} ${
										styles[profile.status.split(" ").join("")]
									}`}
								>
									<span>{profile.status}</span>
								</div>
							</div>
						</div>
						{profile.status !== "complete" && profile.comments.length !== 0 && (
							<div className={styles.comment__container}>
								{profile.comments.map((item, index) => (
									<p key={index} className={styles.comment}>
										{`${index + 1}.   ${item}`}
									</p>
								))}
							</div>
						)}
					</div>

					{profile.status === "complete" ? (
						<div className={styles.upload__group}>
							<div className={styles.upload__title__container}>
								<span>&nbsp;</span>
							</div>
							<div className={styles.prompt}>
								<span>
									Your test results have been verified by the health center.
									You can now come to the Health Center to obtain your health
									center certificate.
								</span>
							</div>
						</div>
					) : (
						<>
							{(!isEmpty(eye_test_result.url) ||
								!isEmpty(ecg_test_result.url) ||
								!isEmpty(urine_test_result.url) ||
								!isEmpty(hermatology_test_result.url)) && (
								<div className={styles.upload__group}>
									<div className={styles.upload__title__container}>
										<h6 className='heading--6'>Uploaded Files</h6>
									</div>
									<div className={styles.upload__image__container}>
										<UploadedImage
											title='Eye Test Result'
											state={eye_test_result}
											stateSetter={set_eye_test_result}
										/>
										<UploadedImage
											title='E.C.G Test'
											state={ecg_test_result}
											stateSetter={set_ecg_test_result}
										/>
										<UploadedImage
											title='Urine Test Result'
											state={urine_test_result}
											stateSetter={set_urine_test_result}
										/>
										<UploadedImage
											title='Hermatology Test Result'
											state={hermatology_test_result}
											stateSetter={set_hermatology_test_result}
										/>
									</div>
								</div>
							)}

							{(eye_test_result.loading ||
								ecg_test_result.loading ||
								urine_test_result.loading ||
								hermatology_test_result.loading) && (
								<div className={styles.upload__group}>
									<div className={styles.upload__title__container}>
										<h6 className='heading--6'>Uploading Files</h6>
									</div>
									<div className={styles.upload__image__container}>
										<UploadingImage
											title='Eye Test Result'
											loading={eye_test_result.loading}
										/>
										<UploadingImage
											title='E.C.G Test Result'
											loading={ecg_test_result.loading}
										/>
										<UploadingImage
											title='Urine Test Result'
											loading={urine_test_result.loading}
										/>
										<UploadingImage
											title='Hermatology Test Result'
											loading={hermatology_test_result.loading}
										/>
									</div>
								</div>
							)}

							{(isNotUploaded(eye_test_result) ||
								isNotUploaded(ecg_test_result) ||
								isNotUploaded(urine_test_result) ||
								isNotUploaded(hermatology_test_result)) && (
								<div className={styles.upload__group}>
									<div className={styles.upload__title__container}>
										<h6 className='heading--6'>Upload Files</h6>
									</div>
									<div className={styles.upload__image__container}>
										<UploadImage
											title='Eye Test Result'
											notUploaded={isNotUploaded(eye_test_result)}
											handleImageChange={handleImageChange}
											state={eye_test_result}
											stateSetter={set_eye_test_result}
										/>
										<UploadImage
											title='E.C.G Test Result'
											notUploaded={isNotUploaded(ecg_test_result)}
											handleImageChange={handleImageChange}
											state={ecg_test_result}
											stateSetter={set_ecg_test_result}
										/>
										<UploadImage
											title='Urine Test Result'
											notUploaded={isNotUploaded(urine_test_result)}
											handleImageChange={handleImageChange}
											state={urine_test_result}
											stateSetter={set_urine_test_result}
										/>
										<UploadImage
											title='Hermatology Test Result'
											notUploaded={isNotUploaded(hermatology_test_result)}
											handleImageChange={handleImageChange}
											state={hermatology_test_result}
											stateSetter={set_hermatology_test_result}
										/>
									</div>
								</div>
							)}
						</>
					)}
				</div>
			)}
			{profile.status !== "complete" && (
				<div className={styles.btn__container}>
					<Button
						disabled={
							isEmpty(eye_test_result.url) ||
							isEmpty(ecg_test_result.url) ||
							isEmpty(urine_test_result.url) ||
							isEmpty(hermatology_test_result.url)
						}
						loading={uploadDocumentsIsLoading}
						onClick={onClickHandler}
					>
						Submit
					</Button>
				</div>
			)}
			{modalIsOpen && (
				<Modal>
					<div className={styles.modal__container}>
						<Image
							src='/img/mark.png'
							alt='Mark image'
							height={88}
							width={88}
						/>
						<h4 className='heading--4'>
							Medical Reports Uploaded Successfully
						</h4>
						<p>
							Your medical reports have been submitted and are being vetted by
							the health center. Check back in a little while to see if they
							have been verified.
						</p>
						<Link href='/student/main/dashboard' passHref>
							<a>
								<Button>Dashboard</Button>
							</a>
						</Link>
					</div>
				</Modal>
			)}
			{backdropIsOpen && <Backdrop />}
		</CheckAuth>
	);
};

export default Verification;
