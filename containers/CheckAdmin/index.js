import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import decodeToken from "jwt-decode";

// Store
import { logout } from "../../store/user";

const CheckAdmin = ({ children }) => {
	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			const userData = decodeToken(token);
			if (!userData) {
				router.push("/admin/login");
			}

			if (userData.exp * 1000 < new Date()) {
				dispatch(logout());
				router.push("/admin/login");
			}
			if (userData?.role !== "admin") {
				router.push("/");
			}
		} else {
			dispatch(logout());
			router.push("/admin/login");
		}
	}, [user, router, dispatch]);

	return <>{children}</>;
};

export default CheckAdmin;
