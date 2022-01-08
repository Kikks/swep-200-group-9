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
import CheckAuth from "../containers/CheckAuth";

// Components
import OnboardingLayout from "../Layout/OnboardingLayout";
import Button from "../components/Button";
import Backdrop from "../components/Backdrop";
import CircularProgress from "../components/CircularProgress";
import Modal from "../components/Modal";

// Utils
import { getRequest, postRequest } from "../utils/api/calls";
import {
	GET_USER_VERIFICATION_PROFILE,
	UPLOAD_IMAGE,
	UPLOAD_VERIFICATION_PROFILE_ONE
} from "../utils/api/urls";
import queryKeys from "../utils/api/queryKeys";

//styles
import styles from "../styles/verification.module.css";

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
	const [biodata, setBioData] = useState(imageState);
	const [clearance, setClearance] = useState(imageState);
	const [passport, setPassport] = useState(imageState);

	const { isLoading, refetch } = useQuery(
		queryKeys.getUserVerificationProfile,
		() =>
			getRequest({
				url: GET_USER_VERIFICATION_PROFILE({ id: user?._id || "" })
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

				if (data?.data?.profile?.clearance_certificate) {
					setClearance({
						...clearance,
						url: data.data.profile.clearance_certificate
					});
				}

				if (data?.data?.profile?.health_center_bio_data) {
					setBioData({
						...biodata,
						url: data.data.profile.health_center_bio_data
					});
				}

				if (data?.data?.profile?.passport) {
					setPassport({
						...passport,
						url: data.data.profile.passport
					});
				}

				if (data?.data?.profile?.status === "complete") {
					router.push("/student/main/dashboard");
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
			url: UPLOAD_VERIFICATION_PROFILE_ONE({ id: user?._id || "" }),
			data: {
				health_center_bio_data: biodata.url,
				clearance_certificate: clearance.url,
				passport: passport.url
			}
		});
	};

	return (
		<CheckAuth>
			<OnboardingLayout
				image='/img/verification-1.jpg'
				title='Health Center Registration Stage One'
				body={
					<>
						<p className='text-white' style={{ maxWidth: "35rem" }}>
							You are required to upload the follwing documents:{" "}
							<span className='bold'>Biodata Form</span>,{" "}
							<span className='bold'>Clearance Certificate</span> and your{" "}
							<span className='bold'>Passport</span>
						</p>

						<p className='text-white' style={{ maxWidth: "35rem" }}>
							Start the process to obtain your{" "}
							<span className='bold'>Virtual Card</span>
						</p>
					</>
				}
			>
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
						<h2 className='heading--2'>Upload Documents</h2>

						<div className={styles.profile__container}>
							<div className={styles.heading__container}>
								{profile.comments.length === 0 ? (
									<div />
								) : (
									<span className='bold'>Comment(s):</span>
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
							{profile.comments.length !== 0 && (
								<div className={styles.comment__container}>
									{profile.comments.map((item, index) => (
										<p key={index} className={styles.comment}>
											- {item}
										</p>
									))}
								</div>
							)}
						</div>

						{(!isEmpty(clearance.url) ||
							!isEmpty(biodata.url) ||
							!isEmpty(passport.url)) && (
							<div className={styles.upload__group}>
								<h4 className='heading--5'>Uploaded Files</h4>
								<UploadedImage
									title='Clearance Certificate'
									state={clearance}
									stateSetter={setClearance}
								/>
								<UploadedImage
									title='Biodata Form'
									state={biodata}
									stateSetter={setBioData}
								/>
								<UploadedImage
									title='Passport'
									state={passport}
									stateSetter={setPassport}
								/>
							</div>
						)}

						{(clearance.loading || biodata.loading || passport.loading) && (
							<div className={styles.upload__group}>
								<h4 className='heading--5'>Uploading Files</h4>
								<UploadingImage
									title='Clearance Certificate'
									loading={clearance.loading}
								/>
								<UploadingImage
									title='Biodata Form'
									loading={biodata.loading}
								/>
								<UploadingImage title='Passport' loading={passport.loading} />
							</div>
						)}

						{(isNotUploaded(clearance) ||
							isNotUploaded(biodata) ||
							isNotUploaded(passport)) && (
							<div className={styles.upload__group}>
								<h4 className='heading--5'>Upload Files</h4>
								<UploadImage
									title='Clearance Certificate'
									notUploaded={isNotUploaded(clearance)}
									handleImageChange={handleImageChange}
									state={clearance}
									stateSetter={setClearance}
								/>
								<UploadImage
									title='Biodata Form'
									notUploaded={isNotUploaded(biodata)}
									handleImageChange={handleImageChange}
									state={biodata}
									stateSetter={setBioData}
								/>
								<UploadImage
									title='Passport'
									notUploaded={isNotUploaded(passport)}
									handleImageChange={handleImageChange}
									state={passport}
									stateSetter={setPassport}
								/>
							</div>
						)}
					</div>
				)}
				<div className={styles.btn__container}>
					<Button
						disabled={
							isEmpty(clearance.url) ||
							isEmpty(biodata.url) ||
							isEmpty(passport.url)
						}
						loading={uploadDocumentsIsLoading}
						onClick={onClickHandler}
					>
						Submit
					</Button>
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
							<h4 className='heading--4'>Documents Uploaded Successfully</h4>
							<p>
								Your documents have been submitted and are being vetted by the
								health center. Check back in a little while to see if they have
								been verified.
							</p>
							<Link href='/' passHref>
								<a>
									<Button>Home Page</Button>
								</a>
							</Link>
						</div>
					</Modal>
				)}
				{backdropIsOpen && <Backdrop />}
			</OnboardingLayout>
		</CheckAuth>
	);
};

export default Verification;
