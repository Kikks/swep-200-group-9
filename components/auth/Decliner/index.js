import { useState, useEffect } from "react";
import { MdCancel, MdAdd } from "react-icons/md";
import { BiError } from "react-icons/bi";
import { useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";

// Components
import Button from "../../Button";
import Input from "../../Input";

// Utils
import { postRequest } from "../../../utils/api/calls";

// Store
import {
	addComment,
	removeComment,
	clearComments,
	setComments
} from "../../../store/comments";

// Styles
import styles from "./Decliner.module.css";

const Decliner = ({ onClose, previousComments, refetch, url }) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState("");
	const { comments } = useSelector(state => state.comments);
	const dispatch = useDispatch();

	const { mutate, isLoading } = useMutation(postRequest, {
		onSuccess() {
			onClose();
			refetch();
		},
		onError(error) {
			setError("There was a problem declining profile. Try again later");
			console.log(error?.response);
		}
	});

	const onDecline = () => {
		mutate({ url, data: { comments } });
	};

	const onAddComment = () => {
		setValue("");
		if (value.trim() !== "") {
			dispatch(addComment(value));
		} else {
			alert("You cannot add an empty comment");
		}
	};

	const onRemoveComment = comment => {
		dispatch(removeComment(comment));
	};

	useEffect(() => {
		dispatch(setComments(previousComments || []));
		return () => {
			dispatch(clearComments);
		};
	}, [dispatch, previousComments]);

	return (
		<div className={styles.backdrop__container}>
			<div
				className={styles.backdrop}
				role='button'
				onClick={() => {
					onClose();
					dispatch(clearComments());
				}}
			/>
			<div className={styles.container}>
				<div className={styles.heading}>
					<h4 className='heading--4'>Decline Verification</h4>
					<span>
						Please describe in detail what was wrong with the uploaded documents
						below:
					</span>
				</div>

				{error.trim() !== "" && (
					<div className={styles.general__error}>
						<BiError color='#fff' size='2.5rem' />
						<p>{error}</p>
					</div>
				)}

				<div className={styles.text__container}>
					<div className={styles.input__container}>
						<Input
							type='text'
							value={value}
							onChange={event => setValue(event.target.value)}
							placeholder='The (document name) had...'
							style={{ width: "100%" }}
							label='Comment(s)'
						/>
						<MdAdd
							size='3rem'
							color='green'
							style={{
								cursor: "pointer",
								margin: "2rem",
								marginTop: "3rem"
							}}
							onClick={onAddComment}
						/>
					</div>
					{comments.length === 0 ? (
						<h6
							className='heading--6'
							style={{ margin: "3rem", textAlign: "center" }}
						>
							No comments yet.
						</h6>
					) : (
						<div className={styles.list__container}>
							<ol className={styles.list}>
								{comments.map((comment, index) => (
									<li key={index} className={styles.list__item}>
										<span>{`${index + 1}. ${comment}`}</span>

										<MdCancel
											style={{ cursor: "pointer", marginLeft: "2rem" }}
											color='#f74646'
											size='2rem'
											onClick={() => onRemoveComment(comment)}
										/>
									</li>
								))}
							</ol>
						</div>
					)}
				</div>

				<div className={styles.button__container}>
					<span
						className={styles.cancel}
						role='button'
						onClick={() => {
							onClose();
							dispatch(clearComments());
						}}
					>
						Cancel
					</span>

					<Button variant='error' loading={isLoading} onClick={onDecline}>
						Decline
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Decliner;
