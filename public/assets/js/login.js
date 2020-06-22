$(document).ready(function() {
  // obtainging references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // when form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // if we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects to the members page
  function loginUser(email, password) {
    // $.post("/api/login", {
    //   email: email,
    //   password: password
    // }).then(function(data) {
    //   window.location.replace(data);
    //   // if error, log error
    // }).catch(function(err) {
    //   console.log(err);
    // });

    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      if (data) {
        // user successfully registered, so do the following
        window.localStorage.setItem("user", data)
        $("#auth").empty();
        window.location.replace("./members");
      } else {
        // user failed to registered, so do the following
        console.log("registration failed")
        $("#email").val("").focus();
      }
      // window.location.replace(data);
      // if error, log error
    })
    // .catch(function(err) {
    //   console.log(err);
    // });
  }

});
