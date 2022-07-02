// constantes, variables y objetos

const form = document.getElementById('form');

const formInputs = form.children[1];

const formSubmitError = formInputs.children[10];

const btnSubmit = formInputs.children[11];

const inputs = {
	name: undefined,
	email: undefined,
	phone: undefined
};

let send = false;

let timeoutError, timeoutSend;

// Regular Expresion

const regExp = {
	// Lo unico es que es valido cuando termina en guion
	name: /^([a-záéíóúñ]\-?\s?){1,}$/i,
	email:
		/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
	phone: /^\+?(-?\(?\)?\s?[0-9]+\s?){1,}$/
};

// funtion validator inputs

const validator = (e) => {
	const element = e.target;
	const validator = element.dataset.validator;

	if (validator) {
		if (element.value.length === 0) {
			formInputs.classList.remove(`form-block--group-inputs__${validator}-invalid`);

			inputs[validator] = undefined;
		} else if (!regExp[validator].test(element.value)) inputs[validator] = false;
		else inputs[validator] = true;

		if (inputs[validator] != undefined)
			formInputs.classList.toggle(`form-block--group-inputs__${validator}-invalid`, !regExp[validator].test(element.value));

		formInputs.classList.toggle(`form-block--group-inputs__${validator}-required`, inputs[validator] === undefined);
	}
};

form.addEventListener('change', validator);

// submit form

const submitError = () => {
	clearTimeout(timeoutError);

	formSubmitError.style.transitionDuration = '0s';
	formInputs.classList.remove(`form-block--group-inputs__submit-error`);

	// hay que dar TIEMPO para procesar el cambio de estilo en linea
	setTimeout(() => {
		formSubmitError.style.transitionDuration = '0.4s';
		formInputs.classList.add(`form-block--group-inputs__submit-error`);
	}, 10);

	timeoutError = setTimeout(() => {
		formInputs.classList.remove(`form-block--group-inputs__submit-error`);
	}, 4000);
};

const submitSend = () => {
	clearTimeout(timeoutSend);

	formInputs.classList.remove(`form-block--group-inputs__submit-error`);

	formInputs.classList.add(`form-block--group-inputs__submit-send`);

	timeoutSend = setTimeout(() => {
		formInputs.classList.remove(`form-block--group-inputs__submit-send`);
	}, 4000);

	inputs.name = undefined;
	inputs.email = undefined;

	form.reset();
};

const enableSubmit = () => {
	if (localStorage.getItem('lang') === 'es') btnSubmit.value = 'Enviar';
	else btnSubmit.value = 'Send';

	btnSubmit.removeAttribute('disabled');
};

form.addEventListener('submit', function (event) {
	event.preventDefault();

	// // se coloca primero para verificar si es indefenido antes de de enviar para que no lo lea cuando mute el objeto
	if (inputs.name === undefined) formInputs.classList.add(`form-block--group-inputs__name-required`);

	if (inputs.email === undefined) formInputs.classList.add(`form-block--group-inputs__email-required`);

	if (inputs.phone === undefined) formInputs.classList.add(`form-block--group-inputs__phone-required`);

	if (inputs.name === true && inputs.email === true && inputs.phone === true) send = true;
	else submitError();

	if (send) {
		if (localStorage.getItem('lang') === 'es') btnSubmit.value = 'Enviando...';
		else btnSubmit.value = 'Sending...';

		// se desabilita solo el submit btn porque la libreria depende de que los inputs esten habilitados
		btnSubmit.setAttribute('disabled', 'true');
		// Elementos de la libreria Email JS
		const serviceID = 'default_service';
		// const templateID = 'template_rdyx4sh';
		const templateID = 'template_o7vzfkj';

		emailjs.sendForm(serviceID, templateID, this).then(
			() => {
				submitSend();

				send = false;

				enableSubmit();
			},
			(err) => {
				if (localStorage.getItem('lang') === 'es') alert('Error de conexion: Intentalo de nuevo');
				else alert('Connection error: try again');

				enableSubmit();
			}
		);
	}
});
