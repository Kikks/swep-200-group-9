// Auth
export const LOGIN = `${process.env.API_URL}/users/auth`;
export const REGISTER = `${process.env.API_URL}/users`;
export const SEND_VERIFICATION_CODE = `${process.env.API_URL}/users/send_code`;

// Verification
export const GET_USER_VERIFICATION_PROFILE = ({ id }) =>
	`${process.env.API_URL}/users/${id}/stage_one_vp`;
export const GET_USER_VERIFICATION_PROFILE_TWO = ({ id }) =>
	`${process.env.API_URL}/users/${id}/stage_two_vp`;
export const UPLOAD_VERIFICATION_PROFILE_ONE = ({ id }) =>
	`${process.env.API_URL}/users/${id}/stage_one_vp/submit`;
export const UPLOAD_VERIFICATION_PROFILE_TWO = ({ id }) =>
	`${process.env.API_URL}/users/${id}/stage_two_vp/submit`;
export const VERIFY_PROFILE_ONE = ({ id }) =>
	`${process.env.API_URL}/users/${id}/stage_one_vp/accept`;
export const VERIFY_PROFILE_TWO = ({ id }) =>
	`${process.env.API_URL}/users/${id}/stage_two_vp/accept`;
export const DECLINE_PROFILE_ONE = ({ id }) =>
	`${process.env.API_URL}/users/${id}/stage_one_vp/decline`;
export const DECLINE_PROFILE_TWO = ({ id }) =>
	`${process.env.API_URL}/users/${id}/stage_two_vp/decline`;

// Upload image
export const UPLOAD_IMAGE = `https://api.cloudinary.com/v1_1/kikks/image/upload`;

// Admin
export const GET_STUDENTS = `${process.env.API_URL}/users/stage_one_vp/all`;
export const GET_STUDENTS_TWO = `${process.env.API_URL}/users/stage_two_vp/all`;
export const GET_STUDENTS_STATISTICS_ONE = `${process.env.API_URL}/users/stage_one_vp/stats`;
export const GET_STUDENTS_STATISTICS_TWO = `${process.env.API_URL}/users/stage_two_vp/stats`;
export const GET_EMERGENCIES = `${process.env.API_URL}/emergencies`;
export const POST_EMERGENCY = `${process.env.API_URL}/emergencies`;

// User
export const GET_MY_EMERGENCIES = `${process.env.API_URL}/emergencies/mine`;
export const GET_HEALTH_ID = ({ registrationNo }) =>
	`https://chi-swep-be.herokuapp.com/card?RegistrationNumber=${registrationNo}`;
