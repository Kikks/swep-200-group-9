export const validateLoginInputs = ({ registrationNumber, password }) => {
	const validationErrors = {};

	if (registrationNumber.trim() === "") {
		validationErrors.registrationNumber =
			"Registration Number must not be empty";
	}

	if (password.trim() === "") {
		validationErrors.password = "Password must not be empty";
	}

	return {
		valid: Object.keys(validationErrors).length === 0,
		errors: validationErrors
	};
};

export const validateSignUpInputs = ({
	firstName,
	lastName,
	email,
	registrationNumber,
	password,
	confirmPassword,
	checked
}) => {
	const validationErrors = {};
	const regex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.trim() === "") {
		validationErrors.email = "Email must not be empty";
	} else if (!email.match(regex)) {
		validationErrors.email = "Invalid Email supplied";
	}

	if (firstName.trim() === "") {
		validationErrors.firstName = "First Name must not be empty";
	}

	if (lastName.trim() === "") {
		validationErrors.lastName = "Last Name must not be empty";
	}

	if (registrationNumber.trim() === "") {
		validationErrors.registrationNumber =
			"Registration Number must not be empty";
	}

	if (password.trim() === "") {
		validationErrors.password = "Password cannot be empty";
	} else if (password !== confirmPassword) {
		validationErrors.confirmPassword = "Passwords must match";
	}

	if (!checked) {
		validationErrors.checked = "You must agree with our terms and conditions";
	}

	return {
		valid: Object.keys(validationErrors).length === 0,
		errors: validationErrors
	};
};

export const validateSendCodeInputs = ({ email, regNo }) => {
	const validationErrors = {};
	const regex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.trim() === "") {
		validationErrors.email = "Email must not be empty";
	} else if (!email.match(regex)) {
		validationErrors.email = "Invalid Email supplied";
	}

	if (regNo.trim() === "") {
		validationErrors.regNo = "Registration Number must not be empty";
	}

	return {
		valid: Object.keys(validationErrors).length === 0,
		errors: validationErrors
	};
};
