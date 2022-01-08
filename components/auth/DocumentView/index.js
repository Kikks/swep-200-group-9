import { MdClose, MdFullscreen } from "react-icons/md";

import styles from "./DocumentView.module.css";

const DcumentView = ({ title, subtitle, image, onClose }) => {
	return (
		<div className={styles.backdrop__container}>
			<div className={styles.backdrop} role='button' onClick={onClose()} />
			<div className={styles.container}>
				<div className={styles.heading}>
					<div className={styles.titles}>
						<h6 className='heading--6'>{title}</h6>
						<span>{subtitle}</span>
					</div>

					<div className={styles.button__container}>
						<div style={{ marginRight: "2rem" }}>
							<a
								href={image}
								target='_blank'
								rel='noreferrer'
								className={styles.fullScreen}
							>
								<MdFullscreen
									size='2.5rem'
									color='#777'
									style={{ cursor: "pointer" }}
								/>
							</a>
						</div>

						<MdClose
							size='2.5rem'
							color='#777'
							style={{ cursor: "pointer" }}
							onClick={onClose()}
						/>
					</div>
				</div>

				<div className={styles.image__container}>
					<img src={image} alt='' className={styles.image} />
				</div>
			</div>
		</div>
	);
};

export default DcumentView;
