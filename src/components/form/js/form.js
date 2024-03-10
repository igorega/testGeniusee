import CreditCardInputMask from 'credit-card-input-mask';
import { checkingEmptyFields } from './checking-empty-fields';
import { checkingConditionFields } from './checking-condition-fields';
import { checkingEmailField } from './checking-email-field';

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
		const checkFormFields = () => {
			// first name field validation
			checkingEmptyFields(form.fname);

			// last name field validation
			checkingEmptyFields(form.lname);

			// country field validation
			checkingEmptyFields(form.country);

			// address field validation
			checkingEmptyFields(form.address);

			// phone field validation
			checkingConditionFields(form.phone, 14); // number of digits + characters in the mask

			// credit card field validation
			checkingConditionFields(form.card, 19); // number of digits + characters in the mask

			// card cvv2 field validation
			checkingConditionFields(form.cvv, 3); // number of digits

			// checkbox field validation
			checkingConditionFields(form.checkbox, true, true);
		};

		// check email field
		form.querySelector('#email').addEventListener('input', () => {
			checkingEmailField(form.email);
		});

		// check all requireds fields
		form.addEventListener('click', (e) => {
			if (e.target !== form.submitBtn) {

				form.querySelectorAll('[required]').forEach(field => {
					// check form fields on blur
					field.addEventListener('blur', (e) => {
						const getAttr = field.getAttribute('type');

						if (getAttr === 'text') {
							checkingEmptyFields(field);
						}

						if (getAttr === 'tel') {
							const getAttrID = field.getAttribute('id');

							if (getAttrID === 'phone') {
								checkingConditionFields(form.phone, 14);
							}

							if (getAttrID === 'card') {
								checkingConditionFields(form.card, 19);
							}

							if (getAttrID === 'cvv') {
								checkingConditionFields(form.cvv, 3);
							}
						}

						if (getAttr === 'checkbox') {
							checkingConditionFields(form.checkbox, true, true);
						}

					});
				});

			} else {
				e.preventDefault()

				checkFormFields();

				if (form.querySelectorAll('.is-error').length === 0) {

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

				} else {
					form.querySelectorAll('.is-error')[0].focus();
				}

			}
		});
	}
});
