'use strict';

function orderStatus(orderId, status) {
  const req = {
    status,
  };
  fetch(`/s/order/${orderId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        alert(res.message);
        location.href = '/s/order';
      } else {
        alert(res.message);
      }
    });
}
