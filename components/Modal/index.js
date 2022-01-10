import styles from "./Modal.module.css";

const Modal = ({ children, background }) => {
	return (
		<div
			className={`${styles.backdrop} ${
				background ? styles[background] : styles.light
			}`}
		>
			<div className={styles.modal}>{children}</div>
		</div>
	);
};

export default Modal;
