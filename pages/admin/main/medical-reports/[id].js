import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdVisibility, MdCancel, MdChevronLeft } from "react-icons/md";
import { useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";

// Containers
import CheckAdmin from "../../../../containers/CheckAdmin";

// Components
import Avatar from "../../../../components/Avatar";
import Backdrop from "../../../../components/Backdrop";
import Button from "../../../../components/Button";
import DocumentView from "../../../../components/auth/DocumentView";
import Decliner from "../../../../components/auth/Decliner";
import Modal from "../../../../components/Modal";

// Utils
import { getRequest, postRequest } from "../../../../utils/api/calls";
import {
	GET_USER_VERIFICATION_PROFILE_TWO,
	VERIFY_PROFILE_TWO,
	DECLINE_PROFILE_TWO
} from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// Styles
import styles from "../../../../styles/auth/document-verification.module.css";

const ListItem = ({ title, value, onView }) => (
	<div className={styles.list}>
		<div className={styles.list__item}>
			<span>{title}</span>
		</div>

		{value.trim() !== "" ? (
			<MdVisibility
				color='#777'
				size='2.5rem'
				style={{ cursor: "pointer" }}
				onClick={() => onView(title, value)}
			/>
		) : (
			<MdCancel size='2.5rem' color='#f74646' />
		)}
	</div>
);

const MedicalReports = () => {
	const { user } = useSelector(state => state.user);
	const router = useRouter();
	const { id } = router.query;
	const [profile2, setProfile2] = useState({
		eye_test_result: "",
		ecg_test_result: "",
		urine_test_result: "",
		hermatology_test_result: "",
		status: ""
	});
	const [backdropIsOpen, setBackdropIsOpen] = useState(true);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [documentVerificationIsOpen, setDocumentVerificationIsOpen] =
		useState(false);
	const [declinerIsOpen, setDeclinerIsOpen] = useState(false);
	const [currentDocument, setCurrentDocument] = useState({
		title: "",
		image: ""
	});
	const [mutationStatus, setMutationStatus] = useState({
		status: "error",
		message: ""
	});

	const { isLoading, refetch } = useQuery(
		queryKeys.getUserVerificationProfileTwo,
		() =>
			getRequest({
				url: GET_USER_VERIFICATION_PROFILE_TWO({
					id: typeof id === "string" ? id : ""
				})
			}),
		{
			onSuccess(data) {
				if (data?.data?.profile) {
					setProfile2({
						...data.data.profile,
						registrationNumber:
							data?.data?.profile?.user?.registrationNumber || "",
						firstName: data?.data?.profile?.user?.firstName || "",
						lastName: data?.data?.profile?.user?.lastName || ""
					});
				}
				setBackdropIsOpen(false);
			},
			onError(error) {
				console.error(error?.response);
				setBackdropIsOpen(false);
			},
			enabled: !!user?._id,
			refetchOnWindowFocus: false
		}
	);

	const { mutate, isLoading: mutationIsLoading } = useMutation(postRequest, {
		onSuccess() {
			setMutationStatus({
				status: "success",
				message: "Document Verification - Stage 2 Successful"
			});
			setModalIsOpen(true);
			refetch();
		},
		onError(error) {
			setMutationStatus({
				status: "error",
				message: "Document Verification - Stage 2 Failed"
			});
			setModalIsOpen(true);
		}
	});

	const onDocumentViewModalClose = () => {
		setDocumentVerificationIsOpen(false);
	};

	const onDeclinerClose = () => {
		setDeclinerIsOpen(false);
	};

	const onDocumentView = (title, image) => {
		setCurrentDocument({
			title,
			image
		});

		setTimeout(() => {
			setDocumentVerificationIsOpen(true);
		}, 500);
	};

	const onVerifyProfile = () => {
		mutate({
			url: VERIFY_PROFILE_TWO({ id })
		});
	};

	return (
		<CheckAdmin>
			<Head>
				<title>Verify Student Test Results - Admin</title>
			</Head>

			<div className={styles.container}>
				<div className={styles.back__container}>
					<MdChevronLeft
						size='3rem'
						style={{ cursor: "pointer" }}
						onClick={() => router.back()}
					/>
				</div>
				<div className={styles.card}>
					<div className={styles.heading}>
						<div className={styles.name__container}>
							<Avatar label={`${profile2.firstName} ${profile2.lastName}`} />

							<div className={styles.name}>
								<span className='bold'>
									{`${profile2.firstName} ${profile2.lastName}`}
								</span>
								<span>{profile2.registrationNumber}</span>
							</div>
						</div>

						<div
							className={`${styles.status} ${
								styles[
									profile2.status ? profile2.status.split(" ").join("") : ""
								]
							}`}
						>
							<span>{profile2.status || ""}</span>
						</div>
					</div>
				</div>

				<div className={styles.card} style={{ marginTop: "3rem" }}>
					<div className={styles.profile}>
						<div className={styles.heading__container}>
							<h6 className='heading--6'>Test Results</h6>
							{profile2.status === "complete" && (
								<h6 className='heading--6 bold'>Verified!</h6>
							)}
						</div>

						{profile2.status !== "complete" && (
							<>
								<ListItem
									title='Eye Test Reult'
									value={profile2.eye_test_result}
									onView={onDocumentView}
								/>
								<ListItem
									title='ECG Test Result'
									value={profile2.ecg_test_result}
									onView={onDocumentView}
								/>
								<ListItem
									title='Urine Test Result'
									value={profile2.urine_test_result}
									onView={onDocumentView}
								/>
								<ListItem
									title='Hermatology Test Result'
									value={profile2.hermatology_test_result}
									onView={onDocumentView}
								/>

								<div className={styles.button__container}>
									<div style={{ marginRight: "1rem" }}>
										<Button
											variant='error'
											onClick={() => setDeclinerIsOpen(true)}
										>
											Decline
										</Button>
									</div>
									<Button onClick={() => onVerifyProfile()}>Verify</Button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			{(backdropIsOpen || isLoading) && <Backdrop />}
			{documentVerificationIsOpen && (
				<DocumentView
					title='Document Verification - Stage 2'
					subtitle={currentDocument.title}
					onClose={() => onDocumentViewModalClose}
					image={currentDocument.image}
				/>
			)}
			{modalIsOpen && (
				<Modal>
					<div className={styles.modal__container}>
						{mutationStatus.status === "success" ? (
							<Image
								src='/img/mark.png'
								alt='Mark image'
								height={88}
								width={88}
							/>
						) : (
							<MdCancel color='#f74646' size='8.8rem' />
						)}

						<h4 className='heading--4'>{mutationStatus.message}</h4>

						<Button
							onClick={() => setModalIsOpen(false)}
							loading={mutationIsLoading}
						>
							Proceed
						</Button>
					</div>
				</Modal>
			)}
			{declinerIsOpen && (
				<Decliner
					previousComments={profile2.comments}
					onClose={() => onDeclinerClose()}
					refetch={refetch}
					url={DECLINE_PROFILE_TWO({ id: typeof id === "string" ? id : "" })}
				/>
			)}
		</CheckAdmin>
	);
};

export default MedicalReports;
