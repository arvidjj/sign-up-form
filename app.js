const email = document.getElementById('email');
const emailError = document.querySelector('#email + .error');
const form = document.querySelector('form')

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to
// explicitly set the valid/invalid class on our email field
window.addEventListener("load", () => {
    // Here, we test if the field is empty (remember, the field is not required)
    // If it is not, we check if its content is a well-formed e-mail address.
    const isValid = email.value.length === 0 || emailRegExp.test(email.value);
    email.className = isValid ? "valid" : "invalid";
  });

  email.addEventListener("input", () => {
    const isValid = email.value.length === 0 || emailRegExp.test(email.value);
    if (isValid) {
      email.className = "valid";
      emailError.textContent = "";
      emailError.className = "error";
    } else {
      email.className = "invalid";
    }
  });

// This defines what happens when the user tries to submit the data
form.addEventListener("submit", (event) => {
  

  const isValid = email.value.length === 0 || emailRegExp.test(email.value);
  if (!isValid) {
    emailError.textContent = "Invalid Email";
    emailError.className = "error active";
    event.preventDefault();
  } else {
    email.className = "valid";
    emailError.textContent = "";
    emailError.className = "error";
  }
});