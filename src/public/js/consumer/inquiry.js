'use strict';

const contents = document.getElementById('textarea-field'),
  inquiryButton = document.getElementById('button-addon2'),
  chatScreen = document.getElementById('chatScreen');
inquiryButton.addEventListener('click', inquiry);

chatScreen.scrollTop = chatScreen.scrollHeight;

function inquiry() {
  const req = {
    contents: contents.value,
  };
  fetch(window.location.pathname, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      location.reload();
      if (res.success) {
      } else {
        alert(res.message);
      }
    });
}
