$(document).ready(() => {
	// Getting references to our form and inputs
	const emailInput = $("#email-input");
	const passwordInput = $("#password-input");
	const loginButton = $("#login-button");

	// When the form is submitted, we validate there's an email and password entered
	loginButton.on("click", event => {
		event.preventDefault();
		const userData = {
			email: emailInput.val().trim(),
			password: passwordInput.val().trim()
		};

		if (!userData.email || !userData.password) {
			return;
		}

		// If we have an email and password we run the loginUser function and clear the form
		loginUser(userData.email, userData.password);
	});

	// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
	function loginUser(email, password) {
		console.log('1xxxxxxxxxxxxxxxxxx');
		$.post("/api/login", { email, password })
			.then(() => {
				console.log('3xxxxxxxxxxxxxxxxxxxxxxx');
				window.location.replace("/profile");
			})
			.catch(err => {
				console.log('4xxxxxxxxxxxxxxxxxxxxxxx');
				console.log(err);
				displayError(err)
			});
	}
});