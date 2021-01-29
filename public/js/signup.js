$(document).ready(() => {
	// Getting references to our form and input
	const signupForm = $("#sign-up-form");
	const emailInput = $("#email-input");
	const passwordInput = $("#password-input");
	const confirmInput = $("#confirm-input");
	const firstNameInput = $("#first-name-input");
	const lastNameInput = $("#last-name-input");

	// When the signup button is clicked, we validate the email and password are not blank
	signupForm.on("submit", event => {
		event.preventDefault();

		const email = emailInput.val().trim()
		const password = passwordInput.val().trim()
		const confirm = confirmInput.val().trim()
		const firstName = firstNameInput.val().trim()
		const lastName = lastNameInput.val().trim()
		console.log({ email, password, firstName, lastName });

		if (email == '') {
			emailInput.focus()
			return displayError('You need to provied your email.')
		}
		if (password == '') {
			passwordInput.focus()
			return displayError('You need to provied a password.')
		}
		if (password != confirm) {
			passwordInput.focus()
			return displayError('The password doesn\'t match the confirm')
		}
		if (firstName == '') {
			firstNameInput.focus()
			return displayError('You need to provied your first name.')
		}
		if (lastName == '') {
			lastNameInput.focus()
			return displayError('You need to provied your last name.')
		}

		// If we have an email and password, run the signUpUser function
		signUpUser({ email, password, firstName, lastName });
	});

	// Does a post to the signup route. If successful, we are redirected to the members page
	// Otherwise we log any errors
	function signUpUser(data) {
		$.post("/api/signup", data)
			.then(() => {
				window.location.replace("/profile");
				// If there's an error, handle it by throwing up a bootstrap alert
			})
			.catch(handleLoginErr);
	}

	function handleLoginErr() {
		$("#alert .msg").text("There is sthing wrong");
		$("#alert").fadeIn(500);
	}
});
