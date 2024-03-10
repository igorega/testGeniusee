import * as EmailValidator from 'email-validator';

export function checkingEmailField(
		formField,
		errorClass = 'is-error',
	) {

	if (EmailValidator.validate(formField.value) || formField.value === '') {
		formField.classList.remove(errorClass);
	} else {
		formField.classList.add(errorClass);
	}
};
