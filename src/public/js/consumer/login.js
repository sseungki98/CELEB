'use strict';

const email = document.getElementById('email'),
  password = document.getElementById('password'),
  loginButton = document.getElementById('loginButton');
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
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = '/';
      } else {
        alert(res.message);
      }
    });
}
