'use strict';

const email = document.querySelector('#email'),
  password = document.querySelector('#password'),
  loginButton = document.querySelector('#loginButton');
loginButton.addEventListener('click', login);

function login() {
  const req = {
    email: email.value,
    password: password.value,
  };
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        location.href = '/';
      } else {
        alert(res.message);
      }
    });
}
