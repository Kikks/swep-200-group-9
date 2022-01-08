import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { MdVisibility } from "react-icons/md";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Containers
import CheckAdmin from "../../../../containers/CheckAdmin";

// Components
import Avatar from "../../../../components/Avatar";
import Backdrop from "../../../../components/Backdrop";

// Utils
import { getRequest } from "../../../../utils/api/calls";
import { GET_STUDENTS } from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// Styles
import styles from "../../../../styles/auth/document-verification.module.css";

const DocumentVerification = () => {
	const { user: admin } = useSelector(state => state.user);
	const [students, setStudents] = useState([]);
	const [backdropIsOpen, setBackdropIsOpen] = useState(true);

	const { isLoading } = useQuery(
		queryKeys.getStudents,
		() =>
			getRequest({
				url: GET_STUDENTS
			}),
		{
			onSuccess(data) {
				setStudents(data?.data?.profiles || []);
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
				<title>Verify Students&apos; Documents - Admin</title>
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
								<span>Matric No.</span>
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

						{students.length === 0 ? (
							<div
								style={{
									width: "100%",
									padding: "5rem 2rem",
									textAlign: "center"
								}}
							>
								<h5 className='heading--5 bold'>No Student to display</h5>
							</div>
						) : (
							students.map(({ status, user }, index) => (
								<div key={user?._id || ""} className={styles.row}>
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
												label={`${user?.firstName || ""} ${
													user?.lastName || ""
												}`}
											/>

											<span>{`${user?.firstName || ""} ${
												user?.lastName || ""
											}`}</span>
										</div>
									</div>

									<div className={styles.cell}>
										<span>{user?.registrationNumber || ""}</span>
									</div>

									<div
										className={styles.cell}
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center"
										}}
									>
										<div
											className={`${styles.status} ${
												styles[status ? status.split(" ").join("") : ""]
											}`}
										>
											<span>{status || ""}</span>
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
										<Link
											href={`/admin/main/document-verification/${user?._id || ""}`}
											passHref
										>
											<MdVisibility
												size='2rem'
												color='#777'
												style={{ cursor: "pointer" }}
											/>
										</Link>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>

			{(backdropIsOpen || isLoading) && <Backdrop />}
		</CheckAdmin>
	);
};

export default DocumentVerification;
