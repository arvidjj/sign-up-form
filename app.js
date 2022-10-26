const requiredFields = Array.from(document.querySelectorAll('input.required'));
const requiredFieldsSpans = Array.from(document.querySelectorAll('input.required + .error'));

const email = document.getElementById('email');
const emailError = document.querySelector('#email + .error');

const password = document.getElementById('password');
const passwordError = document.querySelector('#password + .error');
const confirmPassword = document.getElementById('confirmpassword');
const confirmPasswordError = document.querySelector('#confirmpassword + .error');
const form = document.querySelector('form')

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to
// explicitly set the valid/invalid class on our email field
/*window.addEventListener("load", () => {
    // Here, we test if the field is empty (remember, the field is not required)
    // If it is not, we check if its content is a well-formed e-mail address.
    const isValid = email.value.length === 0 || emailRegExp.test(email.value);
    email.className = isValid ? "valid" : "invalid";
  });*/

function turnValid(field) {
  field.classList.add("valid");
  field.classList.remove("invalid");
}
function turnInvalid(field) {
  field.classList.add("invalid");
  field.classList.remove("valid");
}
function isFieldEmpty(field) {
  return field.value.length === 0;
}

email.addEventListener("input", () => {
  const emailValid = email.value.length === 0 || emailRegExp.test(email.value);
  if (emailValid) {
    turnValid(email);
    emailError.textContent = "";
  } else {
    turnInvalid(email);
  }
});

email.addEventListener('focusout', () => {
  const emailValid = email.value.length === 0 || emailRegExp.test(email.value);
  if (!emailValid) {
    turnInvalid(email);
    emailError.textContent = 'Invalid Email Address';
  }
});

confirmPassword.addEventListener("focusout", () => {
  const passwordsMatch = confirmPassword.value === password.value;
  if (passwordsMatch) {
    turnValid(confirmPassword);
    turnValid(password);
    passwordError.textContent = "";
  } else {
    turnInvalid(confirmPassword);
    turnInvalid(password);
    passwordError.textContent = "Passwords do not match.";
  }
});

password.addEventListener("focusout", () => {
  const passwordsMatch = confirmPassword.value === password.value;
  if (passwordsMatch) {
    turnValid(confirmPassword);
    turnValid(password);
    passwordError.textContent = "";
  } else {
    turnInvalid(confirmPassword);
    turnInvalid(password);
    passwordError.textContent = "Passwords do not match.";
  }
});

// This defines what happens when the user tries to submit the data
form.addEventListener("submit", (event) => {
  requiredFieldsSpans.forEach(span => (span.textContent = ''))

  const isEmailValid = emailRegExp.test(email.value);
  const emptyFields = requiredFields.filter(f => (f.value.length === 0));
  event.preventDefault();
  if (emptyFields.length !== 0) {
    console.log('There are empty required fields!')
    for (let i = 0; i < emptyFields.length; i++) {  // PRINTS FIELD REQUIRED AT EVERY FIELD WHICH IS EMPTY
      const selectedFieldError = document.querySelector(`#${emptyFields[i].getAttribute('id')} + .error`)
      selectedFieldError.textContent = "This field is required.";
    }
    event.preventDefault();
  } else if (!isEmailValid) {
    console.log('Email Invalid!')
    event.preventDefault();
  } else {
    turnValid(email);
    emailError.textContent = "";
  }
});