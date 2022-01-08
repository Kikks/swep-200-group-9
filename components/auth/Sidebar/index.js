import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdDashboard, MdClose, MdLogout } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { RiFirstAidKitFill, RiHealthBookFill } from "react-icons/ri";
import { BsExclamationOctagonFill } from "react-icons/bs";
import { FaIdCardAlt } from "react-icons/fa";
import styles from "./Sidebar.module.css";
import { useSelector, useDispatch } from "react-redux";

// Store
import { logout } from "../../../store/user";

const Sidebar = ({ sidebarIsOpen, setSidebarIsOpen }) => {
	const { user } = useSelector(state => state.user);
	const router = useRouter();
	const activeLink = router.pathname.split("/")[3];
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		localStorage.removeItem("token");
		setTimeout(() => {
			if (router.pathname.split("/")[1] === "admin") {
				router.push("/admin/login");
			} else {
				router.push("/login");
			}
		}, 1000);
	};

	const closeSidebar = () => {
		setSidebarIsOpen(false);
	};

	return (
		<div
			className={`${styles.sidebar} ${
				sidebarIsOpen ? styles.sidebar__open : styles.sidebar__closed
			}`}
		>
			<div className={styles.header}>
				<figure className={styles.logo__container}>
					<Image src='/img/logo--main.png' alt='' layout='fill' />
				</figure>

				<div className={styles.close__container}>
					<MdClose
						size='2.5rem'
						style={{ cursor: "pointer" }}
						onClick={() => setSidebarIsOpen(false)}
					/>
				</div>
			</div>

			{user?.role === "admin" ? (
				<div className={styles.links__container}>
					<Link href='/admin/main/dashboard' passHref>
						<div
							className={`${styles.link} ${
								activeLink === "dashboard" ? styles.link__active : ""
							}`}
							role='button'
							onClick={closeSidebar}
						>
							<MdDashboard
								size='2rem'
								color={activeLink === "dashboard" ? "#fff" : "#458ff6"}
							/>
							<span className={"bold"}>Dashboard</span>
						</div>
					</Link>

					<Link href='/admin/main/document-verification' passHref>
						<div
							className={`${styles.link} ${
								activeLink === "document-verification"
									? styles.link__active
									: ""
							}`}
							role='button'
							onClick={closeSidebar}
						>
							<FaFileAlt
								size='2rem'
								color={
									activeLink === "document-verification" ? "#fff" : "#458ff6"
								}
							/>
							<span className={"bold"}>Document Verification</span>
						</div>
					</Link>

					<Link href='/admin/main/medical-reports' passHref>
						<div
							className={`${styles.link} ${
								activeLink === "medical-reports" ? styles.link__active : ""
							}`}
							role='button'
							onClick={closeSidebar}
						>
							<RiHealthBookFill
								size='2rem'
								color={activeLink === "medical-reports" ? "#fff" : "#458ff6"}
							/>
							<span className={"bold"}>Medical Reports</span>
						</div>
					</Link>

					{/* <Link href='/admin/main/doctors' passHref>
						<div
							className={`${styles.link} ${
								activeLink === "doctors" ? styles.link__active : ""
							}`}
						>
							<RiFirstAidKitFill
								size='2rem'
								color={activeLink === "doctors" ? "#fff" : "#458ff6"}
							/>
							<span className={"bold"}>Doctors</span>
						</div>
					</Link> */}

					<Link href='/admin/main/emergency' passHref>
						<div
							className={`${styles.link} ${
								activeLink === "emergency" ? styles.link__active : ""
							}`}
							role='button'
							onClick={closeSidebar}
						>
							<BsExclamationOctagonFill
								size='2rem'
								color={activeLink === "emergency" ? "#fff" : "#458ff6"}
							/>
							<span className={"bold"}>Emergency</span>
						</div>
					</Link>
				</div>
			) : (
				<div className={styles.links__container}>
					<Link href='/student/main/dashboard' passHref>
						<div
							className={`${styles.link} ${
								activeLink === "dashboard" ? styles.link__active : ""
							}`}
							role='button'
							onClick={closeSidebar}
						>
							<MdDashboard
								size='2rem'
								color={activeLink === "dashboard" ? "#fff" : "#458ff6"}
							/>
							<span className={"bold"}>Dashboard</span>
						</div>
					</Link>

					<Link href='/student/main/medical-reports' passHref>
						<div
							className={`${styles.link} ${
								activeLink === "medical-reports" ? styles.link__active : ""
							}`}
							role='button'
							onClick={closeSidebar}
						>
							<RiHealthBookFill
								size='2rem'
								color={activeLink === "medical-reports" ? "#fff" : "#458ff6"}
							/>
							<span className={"bold"}>Medical Reports</span>
						</div>
					</Link>

					<Link href='/student/main/emergency' passHref>
						<div
							className={`${styles.link} ${
								activeLink === "emergency" ? styles.link__active : ""
							}`}
							role='button'
							onClick={closeSidebar}
						>
							<BsExclamationOctagonFill
								size='2rem'
								color={activeLink === "emergency" ? "#fff" : "#458ff6"}
							/>
							<span className={"bold"}>Emergency</span>
						</div>
					</Link>

					<Link href='/student/main/profile' passHref>
						<div
							className={`${styles.link} ${
								activeLink === "profile" ? styles.link__active : ""
							}`}
							role='button'
							onClick={closeSidebar}
						>
							<FaIdCardAlt
								size='2rem'
								color={activeLink === "profile" ? "#fff" : "#458ff6"}
							/>
							<span className={"bold"}>Health ID</span>
						</div>
					</Link>
				</div>
			)}

			<div className={styles.logout__container}>
				<div className={styles.logout} onClick={onLogout}>
					<MdLogout size='2rem' color={"#f74646"} />
					<span className='bold'>Logout</span>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
