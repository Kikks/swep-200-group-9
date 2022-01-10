import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Containers
import CheckAuth from "../../../containers/CheckAuth";

// Components
import Backdrop from "../../../components/Backdrop";

// Utils
import { getRequest } from "../../../utils/api/calls";
import { GET_HEALTH_ID } from "../../../utils/api/urls";
import queryKeys from "../../../utils/api/queryKeys";

// Styles
import styles from "../../../styles/auth/health-id.module.css";

const Profile = () => {
	const { user } = useSelector(state => state.user);
	const [backdropIsOpen, setBackdropIsOpen] = useState(false);
	const [profile, setProfile] = useState({
		Name: "",
		"Registration Number": "",
		"health center id": "",
		passport: ""
	});

	const { isLoading } = useQuery(
		queryKeys.getHealthId,
		() =>
			getRequest({
				url: GET_HEALTH_ID({ registrationNo: user?.registrationNumber || "" })
			}),
		{
			onSuccess(data) {
				setProfile(data);
				setBackdropIsOpen(false);
			},
			onError(error) {
				console.error(error?.response);
				setBackdropIsOpen(false);
			},
			enabled: !!user?._id
		}
	);

	return (
		<CheckAuth>
			<Head>
				<title>Health ID Student</title>
			</Head>

			<div className={styles.container}>
				<h4 className='heading--4' style={{ textAlign: "center" }}>
					Health Center ID
				</h4>

				<div className={styles.card}>
					<div className={styles.heading}>
						<h5 className='heading--5 bold'>Registration Card</h5>
					</div>

					<div className={styles.body}>
						<figure className={styles.image__container}>
							<img
								src={profile.passport}
								className={styles.image}
								alt='Passport'
							/>
						</figure>

						<div className={styles.details}>
							<div className={styles.detail__group}>
								<h6 className='heading--6 bold'>Full Name:</h6>
								<h3 className='heading--5'>{profile.Name}</h3>
							</div>
							<div className={styles.detail__group}>
								<h6 className='heading--6 bold'>Registration Number:</h6>
								<h3 className='heading--5'>{profile["Registration Number"]}</h3>
							</div>
							<div className={styles.detail__group}>
								<h6 className='heading--6 bold'>Health Center Id:</h6>
								<h3 className='heading--5'>{profile["health center id"]}</h3>
							</div>
						</div>
					</div>

					<div className={styles.footer}>
						<figure className={styles.logo__container}>
							<Image src='/img/logo--main.png' alt='Passport' layout='fill' />
						</figure>
					</div>
				</div>
			</div>

			{(backdropIsOpen || isLoading) && <Backdrop />}
		</CheckAuth>
	);
};
export default Profile;
