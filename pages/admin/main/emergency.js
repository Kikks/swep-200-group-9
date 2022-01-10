import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { MdVisibility, MdClose, MdLocationPin } from "react-icons/md";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";

// Containers
import CheckAdmin from "../../../containers/CheckAdmin";

// Components
import Avatar from "../../../components/Avatar";
import Backdrop from "../../../components/Backdrop";

// Utils
import { getRequest } from "../../../utils/api/calls";
import { GET_EMERGENCIES } from "../../../utils/api/urls";
import queryKeys from "../../../utils/api/queryKeys";

// Styles
import styles from "../../../styles/auth/emergency.module.css";

const Marker = ({ text }) => (
	<div style={{ display: "flex", alignItems: "center" }}>
		<MdLocationPin style={{ color: "#ff0000" }} />
		<span style={{ color: "#fff" }}>{text}</span>
	</div>
);

const Emergency = () => {
	const { user: admin } = useSelector(state => state.user);
	const [emergencies, setEmergencies] = useState([]);
	const [backdropIsOpen, setBackdropIsOpen] = useState(true);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [currentemergency, setCurrentEmergency] = useState({
		issue: "",
		location: "",
		user: {
			firstName: "",
			lastName: ""
		}
	});

	const { isLoading } = useQuery(
		queryKeys.getEmergencies,
		() =>
			getRequest({
				url: GET_EMERGENCIES
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
			enabled: !!admin?._id,
			refetchOnWindowFocus: false
		}
	);

	return (
		<CheckAdmin>
			<Head>
				<title>Emergencies - Admin</title>
			</Head>

			<div className={styles.container}>
				<div className={styles.table__container}>
					<div className={styles.table}>
						<div className={styles.table__header}>
							<div
								className={styles.table__header__cell}
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<span>S/N</span>
							</div>

							<div className={styles.table__header__cell}>
								<span>Full Name</span>
							</div>

							<div className={styles.table__header__cell}>
								<span>Health ID</span>
							</div>

							<div
								className={styles.table__header__cell}
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<span>Status</span>
							</div>

							<div
								className={styles.table__header__cell}
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<span>View</span>
							</div>
						</div>

						{emergencies.length === 0 ? (
							<div
								style={{
									width: "100%",
									padding: "5rem 2rem",
									textAlign: "center"
								}}
							>
								<h5 className='heading--5 bold'>There are no emergencies</h5>
							</div>
						) : (
							emergencies.map((emergency, index) => (
								<div key={emergency?.user?._id || ""} className={styles.row}>
									<div
										className={styles.cell}
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center"
										}}
									>
										<span>{index + 1}</span>
									</div>

									<div className={styles.cell}>
										<div className={styles.name__container}>
											<Avatar
												label={`${emergency?.user?.firstName || ""} ${
													emergency?.user?.lastName || ""
												}`}
											/>

											<span>{`${emergency?.user?.firstName || ""} ${
												emergency?.user?.lastName || ""
											}`}</span>
										</div>
									</div>

									<div className={styles.cell}>
										<span>{emergency?.user?.health_center_id || ""}</span>
									</div>

									<div
										className={styles.cell}
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center"
										}}
									>
										<div className={`${styles.status} ${styles["error"]}`}>
											<span>{"status" || ""}</span>
										</div>
									</div>

									<div
										className={styles.cell}
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center"
										}}
									>
										<MdVisibility
											size='2rem'
											color='#777'
											style={{ cursor: "pointer" }}
											onClick={() => {
												setModalIsOpen(true);
												setCurrentEmergency(emergency);
											}}
										/>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>

			{(backdropIsOpen || isLoading) && <Backdrop />}
			{modalIsOpen && (
				<div className={styles.backdrop__container}>
					<div
						className={styles.backdrop}
						role='button'
						onClick={() => setModalIsOpen(false)}
					/>
					<div className={styles.modal__container}>
						<div className={styles.modal__heading}>
							<div className={styles.modal__titles}>
								<h4 className='heading--4'>Emergency</h4>
							</div>

							<div className={styles.modal__button__container}>
								<MdClose
									size='2.5rem'
									color='#777'
									style={{ cursor: "pointer" }}
									onClick={() => setModalIsOpen(false)}
								/>
							</div>
						</div>

						<div className={styles.modal__details}>
							<div className={styles.modal__detail__group}>
								<h6 className='heading--6'>Student Name:</h6>
								<h5 className='heading--5'>{`${
									currentemergency?.user?.firstName || ""
								} ${currentemergency?.user?.lastName || ""}`}</h5>
							</div>
							<div className={styles.modal__detail__group}>
								<h6 className='heading--6'>Registration Number:</h6>
								<h5 className='heading--5'>{`${currentemergency?.user?.registrationNumber}`}</h5>
							</div>
							<div className={styles.modal__detail__group}>
								<h6 className='heading--6'>Student Name:</h6>
								<h5 className='heading--5'>{`${currentemergency?.user?.health_center_id}`}</h5>
							</div>
						</div>

						<div className={styles.modal__issue}>
							<h6 className='heading--6' style={{ marginBottom: "1rem" }}>
								Issue:
							</h6>
							<h5 className='heading--5'>{currentemergency?.issue}</h5>
						</div>

						<div className={styles}>
							<h6 className='heading--6' style={{ marginBottom: "1rem" }}>
								Location:
							</h6>
						</div>

						<div className={styles.modal__image__container}>
							<GoogleMapReact
								bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY || "" }}
								defaultCenter={{
									lat: currentemergency?.location.split(",")[1] || 0,
									lng: currentemergency?.location.split(",")[0] || 0
								}}
								defaultZoom={17}
							>
								<Marker
									text={`${currentemergency?.user?.firstName || ""} ${
										currentemergency?.user?.lastName || ""
									}`}
								/>
							</GoogleMapReact>
						</div>
					</div>
				</div>
			)}
		</CheckAdmin>
	);
};

export default Emergency;
