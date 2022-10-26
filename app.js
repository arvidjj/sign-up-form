const requiredFields = Array.from(document.querySelectorAll('input.required'));
const requiredFieldsSpans = Array.from(document.querySelectorAll('input.required + .error'));

const firstName = document.getElementById('first_name');
const firstNameError = document.querySelector('#first_name + .error');

const lastName = document.getElementById('last_name');
const lastNameError = document.querySelector('#last_name + .error');

const email = document.getElementById('email');
const emailError = document.querySelector('#email + .error');

const phone = document.getElementById('phone');
const phoneError = document.querySelector('#phone + .error');

const password = document.getElementById('password');
const passwordError = document.querySelector('#password + .error');
const passwordInfo = document.querySelector('#password ~ .fieldInfo');
const confirmPassword = document.getElementById('confirmpassword');
const confirmPasswordError = document.querySelector('#confirmpassword + .error');
const form = document.querySelector('form')

const nameRegExp =
  /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegExp =
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const phoneRegExp =
/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

function turnValid(field) {
  field.classList.add("valid");
  field.classList.remove("invalid");
  field.classList.remove("correctField");
}
function turnInvalid(field) {
  field.classList.add("invalid");
  field.classList.remove("valid");
  field.classList.remove("correctField");
}
function turnCorrect(field) {
  field.classList.add("correctField");
  field.classList.remove("invalid");
  field.classList.remove("valid");
}
function isFieldEmpty(field) {
  return field.value.length === 0;
}

firstName.addEventListener('focusout', () => {  //MUST ACTIVATE THIS ON INPUT
  const firstNameValid = nameRegExp.test(firstName.value);
  if (!firstNameValid) {
    turnInvalid(firstName);
    firstNameError.textContent = 'Invalid Name';
  } else {
    turnCorrect(firstName);
    firstNameError.textContent = '';
  }
});
lastName.addEventListener('focusout', () => {  //MUST ACTIVATE THIS ON INPUT
  const lastNameValid = nameRegExp.test(lastName.value);
  if (!lastNameValid) {
    turnInvalid(lastName);
    lastNameError.textContent = 'Invalid Name';
  } else {
    turnCorrect(lastName);
    lastNameError.textContent = '';
  }
});

email.addEventListener('focusout', () => {
  const emailValid = email.value.length === 0 || emailRegExp.test(email.value);
  if (!emailValid) {
    turnInvalid(email);
    emailError.textContent = 'Invalid Email Address';
  }
});

email.addEventListener("input", () => {
  const emailValid = email.value.length === 0 || emailRegExp.test(email.value);
  const emailMin = email.value.length >= 9; 
  if (emailValid) {
    turnCorrect(email);
    emailError.textContent = "";
  } else if (!emailMin) {
    console.log("email not long enough")
    emailError.textContent = "Invalid Email Address";
  } else {
    turnInvalid(email);
  }
});

email.addEventListener('focusout', () => { //UNNECESSARY I THINK
  const emailValid = email.value.length === 0 || emailRegExp.test(email.value);
  if (!emailValid) {
    turnInvalid(email);
    emailError.textContent = 'Invalid Email Address';
  }
});

phone.addEventListener("input", () => {
  const phoneValid = phoneRegExp.test(phone.value);
  if (phoneValid) {
    turnCorrect(phone);
    phoneError.textContent = "";
  } else {
    turnInvalid(phone);
    phoneError.textContent = "Invalid phone number";
  }
});
phone.addEventListener("focusout", () => {
  const phoneEmpty = phone.value.length === 0;
  if (phoneEmpty) {
    turnValid(phone);
    phoneError.textContent = "";
  }
});

confirmPassword.addEventListener("focusout", () => {
  const passwordsMatch = confirmPassword.value === password.value;
  const isPasswordValid = passwordRegExp.test(password.value);
  if (passwordsMatch && isPasswordValid) {
    turnCorrect(password)
    turnCorrect(confirmPassword)
    passwordError.textContent = "";
  } else if (passwordsMatch) {
    turnValid(confirmPassword);
    turnValid(password);
    passwordError.textContent = "";
  } else {
    turnInvalid(confirmPassword);
    turnInvalid(password);
    passwordError.textContent = "Passwords do not match.";
  }
});

password.addEventListener("input", () => {
  const passwordsMatch = confirmPassword.value === password.value;
  const isPasswordValid = passwordRegExp.test(password.value);
  if (isPasswordValid && password.value.length !== 0) {
    passwordInfo.classList.remove('error')
    passwordInfo.classList.add('correct')
  } else {
    passwordInfo.className = '';
  }
  if (passwordsMatch && isPasswordValid) {
    turnCorrect(password)
    turnCorrect(confirmPassword)
    passwordError.textContent = "";
  }
});

password.addEventListener("focusout", () => {
  const passwordsMatch = confirmPassword.value === password.value;
  const isPasswordValid = passwordRegExp.test(password.value);
  if (passwordsMatch && isPasswordValid) {
    turnCorrect(password)
    turnCorrect(confirmPassword)
    passwordError.textContent = "";
  } else if (passwordsMatch) {
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

  const firstNameValid = nameRegExp.test(firstName.value);
  const lastNameValid = nameRegExp.test(lastName.value);
  const isEmailValid = emailRegExp.test(email.value);
  const phoneValid = phoneRegExp.test(phone.value) || phone.value.length === 0;
  const isPasswordInvalid = !passwordRegExp.test(password.value) && password.value.length !== 0;

  const emptyFields = requiredFields.filter(f => (f.value.length === 0));
  
  if (emptyFields.length !== 0) {
    console.log('There are empty required fields!')
    for (let i = 0; i < emptyFields.length; i++) {  // PRINTS FIELD REQUIRED AT EVERY FIELD WHICH IS EMPTY
      const selectedFieldError = document.querySelector(`#${emptyFields[i].getAttribute('id')} + .error`)
      turnInvalid(emptyFields[i]);
      selectedFieldError.textContent = "This field is required.";
    }
    event.preventDefault();
  } 
  if (!isEmailValid) {
    console.log('Email Invalid!')
    event.preventDefault();
  } 

  if (isPasswordInvalid) {
    turnInvalid(password);
    passwordInfo.classList.add('error')
    event.preventDefault();
  }

  if (!firstNameValid || !lastNameValid) {
    event.preventDefault()
  }

  if (!phoneValid) {
    event.preventDefault()
  }
  /*else {
    turnValid(email);
    emailError.textContent = ""; 
  }*/
});