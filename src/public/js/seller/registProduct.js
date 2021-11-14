const registButton = document.getElementById('registButton'),
  productName = document.getElementById('productName'),
  mainImage = document.getElementById('mainImage'),
  info = document.getElementById('info'),
  notice = document.getElementById('notice'),
  productPrice = document.getElementById('productPrice'),
  detailImage = document.getElementById('detailImage');
registButton.addEventListener('click', regist);

function regist() {
  const options = document.getElementsByClassName('option');
  const optionCategory = [];
  for (let option of options) {
    if (option.name === 'category') {
      optionCategory.push({ categoryName: option.value, optionArray: [] });
    } else {
      const name = option.querySelector('#name').value,
        price = +option.querySelector('#price').value,
        type = option.id;
      if (optionCategory.length === 0) {
        optionCategory.push({ categoryName: '', optionArray: [{ name, price, type }] });
      } else {
        optionCategory[optionCategory.length - 1].optionArray.push({ name, price, type });
      }
    }
  }
  var formData = new FormData();
  formData.append('productName', productName.value);
  formData.append('info', info.value);
  formData.append('notice', notice.value);
  formData.append('productPrice', productPrice.value);
  formData.append('optionCategory', JSON.stringify(optionCategory));
  formData.append('productMain', mainImage.files[0]);
  for (let i = 0; i < detailImage.files.length; i++) {
    formData.append('productDetail', detailImage.files[i]);
  }
  fetch('/s/product/regist', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        alert(res.message);
        location.href = '/s/product';
      } else {
        alert(res.message);
      }
    });
}
