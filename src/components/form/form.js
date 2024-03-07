import CreditCardInputMask from 'credit-card-input-mask';
import * as EmailValidator from 'email-validator';

document.addEventListener('DOMContentLoaded', () => {

	const form = document.querySelector('#form');

	if (form) {
		// mask for credit card
		new CreditCardInputMask({
			element: form.querySelector('#card'),
			pattern: '{{9999}} {{9999}} {{9999}} {{9999}}',
		});

		// mask for cvv2 card
		new CreditCardInputMask({
			element: form.querySelector('#cvv'),
			pattern: '{{999}}',
		});

		// mask for phone
		new CreditCardInputMask({
			element: form.querySelector('#phone'),
			pattern: '({{999}}) {{999}}-{{9999}}',
		});

		// check form fields function
		const checkFormFields = (focus = true) => {
			// first name field validation
			if (form.fname.value === '') {
				form.fname.classList.add('is-error');
				if (focus) {
					form.fname.focus();
				}
				return false;
			} else {
				form.fname.classList.remove('is-error');
			}

			// last name field validation
			if (form.lname.value === '') {
				form.lname.classList.add('is-error');
				if (focus) {
					form.lname.focus();
				}
				return false;
			} else {
				form.lname.classList.remove('is-error');
			}

			// email field validation
			if (EmailValidator.validate(form.email.value)) {
				form.email.classList.remove('is-error');
			} else {
				form.email.classList.add('is-error');
				if (focus) {
					form.email.focus();
				}
				return false;
			}

			// phone field validation
			if (form.phone.value.length !== 14) {
				form.phone.classList.add('is-error');
				if (focus) {
					form.phone.focus();
				}
				return false;
			} else {
				form.phone.classList.remove('is-error');
			}

			// country field validation
			if (form.country.value === '') {
				form.country.classList.add('is-error');
				if (focus) {
					form.country.focus();
				}
				return false;
			} else {
				form.country.classList.remove('is-error');
			}

			// address field validation
			if (form.address.value === '') {
				form.address.classList.add('is-error');
				if (focus) {
					form.address.focus();
				}
				return false;
			} else {
				form.address.classList.remove('is-error');
			}

			// credit card field validation
			if (form.card.value.length !== 19) {
				form.card.classList.add('is-error');
				if (focus) {
					form.card.focus();
				}
				return false;
			} else {
				form.card.classList.remove('is-error');
			}

			// card cvv2 field validation
			if (form.cvv.value.length !== 3) {
				form.cvv.classList.add('is-error');
				if (focus) {
					form.cvv.focus();
				}
				return false;
			} else {
				form.cvv.classList.remove('is-error');
			}

			// card cvv2 field validation
			if (form.checkbox.checked !== true) {
				form.checkbox.classList.add('is-error');
				if (focus) {
					form.checkbox.focus();
				}
				return false;
			} else {
				form.checkbox.classList.remove('is-error');
			}
		};

		// check form fields on blur
		form.querySelectorAll('[required]').forEach(field => {
			field.addEventListener('blur', (e) => {
				checkFormFields(false);
			});
		});

		// check & submit form data
		form.submitBtn.addEventListener('click', (e) => {
			e.preventDefault();

			if (checkFormFields() !== false) {

				const fname = form.querySelector('#fname').value;
				const lname = form.querySelector('#lname').value;
				const email = form.querySelector('#email').value;
				const phone = form.querySelector('#phone').value;
				const country = form.querySelector('#country').value;
				const address = form.querySelector('#address').value;
				const card = form.querySelector('#card').value;
				const cvv = form.querySelector('#cvv').value;
				const checkbox = form.querySelector('#checkbox').value;

				form.classList.add('is-hold');
				form.submitBtn.setAttribute('disabled', '');

				const submissionsPromise = () =>
					new Promise((resolve) =>
						setTimeout(() => {
								form.classList.remove('is-hold');
								form.submitBtn.removeAttribute('disabled');
								resolve();
							}, 1000
						)
					);

				const submissionsHandler = async () => {
					await submissionsPromise();

					alert(`
						First name - ${fname}
						Last name - ${lname}
						Emai - ${email}
						Phone - ${phone}
						Country - ${country}
						Address - ${address}
						Credit card - ${card}
						CVV2 code - ${cvv}
						Agreement - ${checkbox}
					`);
				};

				submissionsHandler();
				form.reset();
			}
		});
	}
});
