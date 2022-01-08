import { useEffect } from "react";
import decodeToken from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

// Store
import { login } from "../../store/user";

const Auth = ({ children }) => {
	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user) {
			const token = localStorage.getItem("token");
			if (token) {
				const userDetails = decodeToken(token);
				dispatch(
					login({
						...userDetails,
						_id: userDetails?.userId
					})
				);
			}
		}
	});

	return <>{children}</>;
};

export default Auth;
