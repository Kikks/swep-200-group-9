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
	GET_USER_VERIFICATION_PROFILE,
	VERIFY_PROFILE_ONE,
	DECLINE_PROFILE_ONE
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

const DocumentVerification = () => {
	const { user } = useSelector(state => state.user);
	const router = useRouter();
	const { id } = router.query;
	const [profile, setProfile] = useState({
		firstName: "",
		lastName: "",
		registrationNumber: "",
		passport: "",
		clearance_certificate: "",
		health_center_bio_data: "",
		status: "",
		comments: []
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
		queryKeys.getUserVerificationProfile,
		() =>
			getRequest({
				url: GET_USER_VERIFICATION_PROFILE({
					id: typeof id === "string" ? id : ""
				})
			}),
		{
			onSuccess(data) {
				if (data?.data?.profile) {
					setProfile({
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
				message: "Document Verification - Stage 1 Successful"
			});
			setModalIsOpen(true);
			refetch();
		},
		onError(error) {
			setMutationStatus({
				status: "error",
				message: "Document Verification - Stage 1 Failed"
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
			url: VERIFY_PROFILE_ONE({ id })
		});
	};

	return (
		<CheckAdmin>
			<Head>
				<title>Verify Student Documents - Admin</title>
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
							<Avatar label={`${profile.firstName} ${profile.lastName}`} />

							<div className={styles.name}>
								<span className='bold'>
									{`${profile.firstName} ${profile.lastName}`}
								</span>
								<span>{profile.registrationNumber}</span>
							</div>
						</div>

						<div
							className={`${styles.status} ${
								styles[profile.status ? profile.status.split(" ").join("") : ""]
							}`}
						>
							<span>{profile.status || ""}</span>
						</div>
					</div>
				</div>

				<div className={styles.card} style={{ marginTop: "3rem" }}>
					<div className={styles.profile}>
						<div className={styles.heading__container}>
							<h6 className='heading--6'>Document Verification - Stage 1</h6>

							{profile.status === "complete" && (
								<h6 className='heading--6 bold'>Verified!</h6>
							)}
						</div>

						{profile.status !== "complete" && (
							<>
								<ListItem
									title='Bio-data Form'
									value={profile.health_center_bio_data}
									onView={onDocumentView}
								/>
								<ListItem
									title='Clearance Certificate'
									value={profile.clearance_certificate}
									onView={onDocumentView}
								/>
								<ListItem
									title='Passport'
									value={profile.passport}
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

			{(backdropIsOpen || isLoading || mutationIsLoading) && <Backdrop />}
			{documentVerificationIsOpen && (
				<DocumentView
					title='Document Verification - Stage 1'
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

						<Button onClick={() => setModalIsOpen(false)}>Proceed</Button>
					</div>
				</Modal>
			)}
			{declinerIsOpen && (
				<Decliner
					previousComments={profile.comments}
					onClose={() => onDeclinerClose()}
					refetch={refetch}
					url={DECLINE_PROFILE_ONE({ id: typeof id === "string" ? id : "" })}
				/>
			)}
		</CheckAdmin>
	);
};

export default DocumentVerification;
