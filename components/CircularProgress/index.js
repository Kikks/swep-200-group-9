import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./CircularProgress.module.css";

const CircularProgress = ({ color, size }) => (
	<AiOutlineLoading3Quarters
		className={styles.loader}
		color={color ? color : "var(--main-blue)"}
		size={size ? size : "3rem"}
	/>
);

export default CircularProgress;
