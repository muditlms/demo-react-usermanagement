const { validateEmail } = require("helpers/utils/validateEmail");

export function validationUser(data) {
	const errors = {};
	if (!data.name) {
		errors.name = "Please enter name."
	}
	if (!data.email) {
		errors.email = "Please enter email address."
	}
	if (data.email && !validateEmail(data.email)) {
		errors.email = "Invalid email address."
	}
	if (!data.company) {
		errors.company = "Please enter Company name."
	}
	return Object.values(errors).length > 0 ? errors : false;
}