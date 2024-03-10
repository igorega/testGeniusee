export function checkingConditionFields(
		formField,
		condition,
		checkbox = null,
		errorClass = 'is-error',
	) {
	const fieldValue = checkbox ? formField.checked : formField.value.length;

	if (fieldValue !== condition) {
		formField.classList.add(errorClass);
	} else {
		formField.classList.remove(errorClass);
	}
};
