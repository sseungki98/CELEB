'use strict';

const optionSection = document.getElementsByClassName('option-section'),
  orderButton = document.getElementById('orderButton'),
  productPrice = document.getElementById('productPrice').innerHTML,
  requirements = document.getElementById('requirements'),
  designUrl = document.getElementById('designUrl'),
  selectedDate = document.getElementById('datepicker');

orderButton.addEventListener('click', order);
let options = '';
let total = +productPrice.replace(/[^0-9]/g, '');
function order() {
  Array.prototype.forEach.call(optionSection, function (option) {
    const checkbox = option.querySelectorAll('.checkbox:checked'),
      radio = option.querySelectorAll('.radio:checked'),
      text = option.querySelectorAll('.text:not([value])'),
      categoryName = option.querySelector('.categoryName').innerHTML;
    if (checkbox) {
      for (const op of checkbox) {
        const parent = op.parentElement,
          label = parent.querySelector('#label').innerText,
          price = parent.querySelector('#price').innerText;
        options += options ? ',' + label : label;
        total += +price.replace(/[^0-9]/g, '');
      }
    }
    if (radio) {
      for (const op of radio) {
        const parent = op.parentElement,
          label = parent.querySelector('#label').innerText,
          price = parent.querySelector('#price').innerText;
        options += options ? ',' + categoryName + ': ' + label : categoryName + ': ' + label;
        total += +price.replace(/[^0-9]/g, '');
      }
    }
    if (text) {
      for (const op of text) {
        const parent = op.parentElement,
          label = parent.querySelector('#label').innerText,
          value = op.value,
          price = parent.querySelector('#price').innerText;
        options += options ? ',' + label + ': ' + value : label + ': ' + value;
        total += +price.replace(/[^0-9]/g, '');
      }
    }
  });
  const req = {
    option: options,
    totalPrice: total,
    requirements: requirements.value,
    designUrl: designUrl.files[0],
    selectedDate: selectedDate.value,
  };
  fetch(window.location.href + '/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = '/order/' + res.orderId;
      } else {
        alert(res.message);
      }
    });
}
