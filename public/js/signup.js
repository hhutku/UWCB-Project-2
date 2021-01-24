

$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("#signUp");
  const emailInput = $("#email");
  const passwordInput = $("#Password");
  const fnameInput = $("#fname");
  const lnameInput = $("#lname");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("click", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      fname: fnameInput.val().trim(),
      lname: lnameInput.val().trim()
    };
    console.log("----------userData----------");
    console.log(userData);
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.fname,
      userData.lname
    );
    emailInput.val("");
    passwordInput.val("");
    fnameInput.val("");
    lnameInput.val("");
  });


  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName) {
    $.post("/api/signup", {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName
    })
      .then(() => {
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr() {
    $("#alert .msg").text("There is sthing wrong");
    $("#alert").fadeIn(500);
  }
});
