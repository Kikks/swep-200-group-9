import { useState } from "react";
import { useRouter } from "next/router";
import { MdMenu } from "react-icons/md";

// Components
import Sidebar from "../../components/auth/Sidebar";

// Styles
import styles from "./Layout.module.css";

const AppLayout = ({ children }) => {
	const { pathname } = useRouter();
	const isAuthRoute = pathname.split("/")[2] === "main";
	const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

	return isAuthRoute ? (
		<div className={styles.auth__container}>
			{sidebarIsOpen && (
				<div
					className={styles.backdrop}
					onClick={() => setSidebarIsOpen(false)}
				/>
			)}
			<Sidebar {...{ sidebarIsOpen, setSidebarIsOpen }} />
			<main className={styles.auth__main}>
				<div className={styles.menu__container}>
					<MdMenu
						size='2.5rem'
						style={{ cursor: "pointer" }}
						onClick={() => setSidebarIsOpen(true)}
					/>
				</div>
				{children}
			</main>
		</div>
	) : (
		<>{children}</>
	);
};
export default AppLayout;
