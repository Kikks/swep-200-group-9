import { useState } from "react";
import Head from "next/head";
import { PieChart, Cell, Pie, ResponsiveContainer } from "recharts";
import moment from "moment";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Containers
import CheckAdmin from "../../../containers/CheckAdmin";

// Components
import Button from "../../../components/Button";
import Backdrop from "../../../components/Backdrop";

// Utils
import { getRequest } from "../../../utils/api/calls";
import {
	GET_STUDENTS_STATISTICS_ONE,
	GET_STUDENTS_STATISTICS_TWO,
	GET_EMERGENCIES
} from "../../../utils/api/urls";
import queryKeys from "../../../utils/api/queryKeys";

// Styles
import styles from "../../../styles/auth/dashboard.module.css";

const getStatus = status => {
	switch (status) {
		case "complete":
			return {
				name: "Completed",
				color: "#45a845"
			};

		case "in review":
			return {
				name: "In Review",
				color: "#233348"
			};

		case "declined":
			return {
				name: "Declined",
				color: "#f74646"
			};

		case "incomplete":
			return {
				name: "Incomplete",
				color: "#ffba3b"
			};
		default:
			return {
				name: "Nothing",
				color: "#000"
			};
	}
};

const Dashboard = () => {
	const { user } = useSelector(state => state.user);
	const [data, setData] = useState([
		{ name: "in review", value: 0, color: "#233348" },
		{ name: "success", value: 0, color: "#45a845" },
		{ name: "incomplete", value: 0, color: "#ffba3b" },
		{ name: "declined", value: 0, color: "#f74646" }
	]);
	const [data2, setData2] = useState([
		{ name: "in review", value: 0, color: "#233348" },
		{ name: "success", value: 0, color: "#45a845" },
		{ name: "incomplete", value: 0, color: "#ffba3b" },
		{ name: "declined", value: 0, color: "#f74646" }
	]);
	const [totalNoOfStudents, setTotalNoOfStudents] = useState(0);
	const [studentCount, setStudentCount] = useState({
		verified: 0,
		unverified: 0
	});
	const [noOfEmergencies, setNoOfEmergencies] = useState(0);
	const [backdropIsOpen, setBackdropIsOpen] = useState(true);

	const { isLoading: stageOneLoading } = useQuery(
		queryKeys.getStudentsStatisticsOne,
		() =>
			getRequest({
				url: GET_STUDENTS_STATISTICS_ONE
			}),
		{
			onSuccess(data) {
				if (data?.stats) {
					let total = 0;
					let verifiedStudents = 0;
					const newData = [];
					for (const stat of data?.stats) {
						total = total + (stat?.number_of_students || 0);
						newData.push({
							name: getStatus(stat?._id || "").name,
							value: stat?.number_of_students || 0,
							color: getStatus(stat?._id || "").color
						});
						if (stat?._id === "complete") {
							verifiedStudents = stat?.number_of_students || 0;
						}
					}
					setData(newData);
					setTotalNoOfStudents(total);
					setStudentCount({
						verified: verifiedStudents,
						unverified: total - verifiedStudents
					});
				}
				setBackdropIsOpen(false);
			},
			onError(error) {
				console.error(error.response);
			},
			enabled: !!user
		}
	);

	const { isLoading: stageTwoLoading } = useQuery(
		queryKeys.getStudentsStatisticsTwo,
		() =>
			getRequest({
				url: GET_STUDENTS_STATISTICS_TWO
			}),
		{
			onSuccess(data) {
				if (data?.stats) {
					const newData = [];
					for (const stat of data?.stats) {
						newData.push({
							name: getStatus(stat?._id || "").name,
							value: stat?.number_of_students || 0,
							color: getStatus(stat?._id || "").color
						});
					}
					setData2(newData);
				}
				setBackdropIsOpen(false);
			},
			onError(error) {
				console.error(error.response);
			},
			enabled: !!user
		}
	);

	const { isLoading: emergenciesLoading } = useQuery(
		queryKeys.getEmergencies,
		() =>
			getRequest({
				url: GET_EMERGENCIES
			}),
		{
			onSuccess(data) {
				if (data?.data?.emergencies) {
					setNoOfEmergencies(data.data.emergencies.length || 0);
				}
				setBackdropIsOpen(false);
			},
			onError(error) {
				console.error(error.response);
			},
			enabled: !!user
		}
	);

	return (
		<CheckAdmin>
			<Head>
				<title>Dashboard - Admin</title>
			</Head>

			<div className={styles.container}>
				<div className={styles.card1}>
					<p>{moment().format("dddd, DD MMMM, YYYY")}</p>
					<h2 className='heading--2'>{moment().format("hh:mm A")}</h2>
					<p>Welcome back, Admin</p>
				</div>

				<div className={styles.card2}>
					<p className='bold'>
						<span>{noOfEmergencies}</span> Emergencies
					</p>
					<Button>View All</Button>
				</div>
				<div className={styles.card3}>
					<h6 className='heading--6 bold'>Document Verification Statistics</h6>
					<ResponsiveContainer height='100%' minHeight={200} width='100%'>
						<PieChart height={200} width={200}>
							<Pie
								{...{
									data,
									cx: "50%",
									cy: "50%",
									labelLine: false,
									outerRadius: 80,
									innerRadius: 50,
									dataKey: "value",
									fill: "#8884d8"
								}}
							>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
					<div className={styles.label__container__chart}>
						<div className={styles.label}>
							<div
								className={`${styles.label__bullet} ${styles.label__bullet__success}`}
							/>
							<span className={styles.label__name}>Success</span>
						</div>
						<div className={styles.label}>
							<div
								className={`${styles.label__bullet} ${styles.label__bullet__inreview}`}
							/>
							<span className={styles.label__name}>In Review</span>
						</div>
						<div className={styles.label}>
							<div
								className={`${styles.label__bullet} ${styles.label__bullet__error}`}
							/>
							<span className={styles.label__name}>Declined</span>
						</div>
						<div className={styles.label}>
							<div
								className={`${styles.label__bullet} ${styles.label__bullet__warning}`}
							/>
							<span className={styles.label__name}>Incomplete</span>
						</div>
					</div>
				</div>

				<div className={styles.card4}>
					<h6 className='heading--6 bold'>Medical Report Statistics</h6>
					<ResponsiveContainer height='100%' minHeight={200} width='100%'>
						<PieChart height={200} width={200}>
							<Pie
								{...{
									data: data2,
									cx: "50%",
									cy: "50%",
									labelLine: false,
									outerRadius: 80,
									innerRadius: 50,
									dataKey: "value",
									fill: "#8884d8"
								}}
							>
								{data2.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
					<div className={styles.label__container__chart}>
						<div className={styles.label}>
							<div
								className={`${styles.label__bullet} ${styles.label__bullet__success}`}
							/>
							<span className={styles.label__name}>Success</span>
						</div>
						<div className={styles.label}>
							<div
								className={`${styles.label__bullet} ${styles.label__bullet__inreview}`}
							/>
							<span className={styles.label__name}>In Review</span>
						</div>
						<div className={styles.label}>
							<div
								className={`${styles.label__bullet} ${styles.label__bullet__error}`}
							/>
							<span className={styles.label__name}>Declined</span>
						</div>
						<div className={styles.label}>
							<div
								className={`${styles.label__bullet} ${styles.label__bullet__warning}`}
							/>
							<span className={styles.label__name}>Incomplete</span>
						</div>
					</div>
				</div>

				<div className={styles.card5}>
					<h6 className='heading--6 bold'>Number of Students</h6>
					<h1>{totalNoOfStudents.toLocaleString("en-US")}</h1>
					<div className={styles.label__container}>
						<div className={styles.label}>
							<div
								className={`${styles.label__bullet} ${styles.label__bullet__success}`}
							/>
							<span
								className={styles.label__name}
							>{`${studentCount.verified.toLocaleString(
								"en-US"
							)} Verified`}</span>
						</div>
						<div className={styles.label}>
							<div
								className={`${styles.label__bullet} ${styles.label__bullet__error}`}
							/>
							<span
								className={styles.label__name}
							>{`${studentCount.unverified.toLocaleString(
								"en-US"
							)} Unverified`}</span>
						</div>
					</div>
				</div>
			</div>

			{(backdropIsOpen ||
				stageTwoLoading ||
				stageOneLoading ||
				emergenciesLoading) && <Backdrop />}
		</CheckAdmin>
	);
};

export default Dashboard;
