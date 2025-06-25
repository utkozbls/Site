document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gal');
  if (!gallery) return;

  gallery.querySelectorAll('img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => show(img.src));
  });

  function show(src) {
    const box = document.createElement('div');
    box.id = 'lightbox';
    box.innerHTML = `<img src="${src}" alt="">`;
    box.addEventListener('click', () => box.remove());
    document.body.appendChild(box);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.querySelector('.submit-button');
  const nameInput = document.querySelectorAll('.input-field')[0];
  const infoInput = document.querySelectorAll('.input-field')[1];
  const reviewsContainer = document.querySelector('.otziv').parentElement;

  submitBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const info = infoInput.value.trim();

    if (!name || !info) {
      alert('Пожалуйста, заполните оба поля!');
      return;
    }

    const newReview = document.createElement('div');
    newReview.classList.add('otziv');

    const newName = document.createElement('h3');
    newName.classList.add('name');
    newName.textContent = name;

    const newText = document.createElement('p');
    newText.textContent = info;

    newReview.appendChild(newName);
    newReview.appendChild(newText);

    reviewsContainer.appendChild(newReview);

    nameInput.value = '';
    infoInput.value = '';
  });
});

