export function checkingEmptyFields(
		formField,
		errorClass = 'is-error',
	) {
	if (formField.value === '') {
		formField.classList.add(errorClass);
	} else {
		formField.classList.remove(errorClass);
	}
};
