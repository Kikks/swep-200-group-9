import axios from "axios";

const baseAxiosMethod = axios.create({});

baseAxiosMethod.interceptors.request.use(
	config => {
		const token = localStorage.getItem("token");
		if (token && config.headers) {
			config.headers['x-auth'] = `${token}`;
		}
		return config;
	},
	error => Promise.reject(error)
);
export default baseAxiosMethod;
