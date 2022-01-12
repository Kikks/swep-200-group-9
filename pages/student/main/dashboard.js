import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import moment from "moment";

// Components
import Button from "../../../components/Button";
import Backdrop from "../../../components/Backdrop";

// Containers
import CheckAuth from "../../../containers/CheckAuth";

// Misc
import generateTip from "../../../misc/health-tips";

// Utils
import { getRequest } from "../../../utils/api/calls";
import {
	GET_MY_EMERGENCIES,
	GET_USER_VERIFICATION_PROFILE_TWO
} from "../../../utils/api/urls";
import queryKeys from "../../../utils/api/queryKeys";

// Styles
import styles from "../../../styles/auth/student-dashboard.module.css";

const Dashboard = () => {
	const { user } = useSelector(state => state.user);
	const [noOfEmergencies, setNoOfEmergencies] = useState(0);
	const [status, setStatus] = useState("declined");
	const [backdropIsOpen, setBackdropIsOpen] = useState(true);

	const { isLoading: verificationProfileLoading } = useQuery(
		queryKeys.getUserVerificationProfileTwo,
		() =>
			getRequest({
				url: GET_USER_VERIFICATION_PROFILE_TWO({ id: user?._id || "" })
			}),
		{
			onSuccess(data) {
				setStatus(data?.data?.profile?.status || "declined");
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

	const { isLoading: emergencyLoading } = useQuery(
		queryKeys.getMyEmergencies,
		() =>
			getRequest({
				url: GET_MY_EMERGENCIES
			}),
		{
			onSuccess(data) {
				setNoOfEmergencies(data?.data?.emergencies.length || 0);
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

	return (
		<CheckAuth>
			<Head>
				<title>Dashboard - Student</title>
			</Head>

			<div className={styles.container}>
				<div className={styles.card1}>
					<p>{moment().format("dddd, DD MMMM, YYYY")}</p>
					<h2 className='heading--2'>{moment().format("hh:mm A")}</h2>
					<p>
						Hello{" "}
						<span style={{ textTransform: "capitalize" }}>{`${
							user?.firstName || ""
						} ${user?.lastName || ""}`}</span>
					</p>
				</div>

				<div className={styles.card2}>
					<p className='bold'>
						<span>{noOfEmergencies}</span> Emergencies
					</p>
					<Button>View All</Button>
				</div>

				<div className={styles.card4}>
					<h6 className='heading--6 bold'>Test Results Status</h6>
					<h4
						className={`heading--3 bold ${styles.status} ${
							styles[status.split(" ").join("")]
						}`}
					>
						{status}
					</h4>
					<Link href='/student/main/medical-reports' passHref>
						<Button>View Test Results</Button>
					</Link>
				</div>

				<div className={styles.card3}>
					<h6 className='heading--6 bold'>Health Tip</h6>
					<div className={styles.health__tip__container}>
						<span className={styles.health__tip}>{`- ${generateTip()}`}</span>
					</div>
				</div>
			</div>
			{(backdropIsOpen || verificationProfileLoading || emergencyLoading) && (
				<Backdrop />
			)}
		</CheckAuth>
	);
};

export default Dashboard;
