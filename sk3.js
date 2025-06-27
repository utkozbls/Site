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
  const [nameInput, infoInput] = document.querySelectorAll('.input-field');
  const reviewsContainer = document.querySelector('.otziv').parentElement;

  const STORAGE_KEY = 'reviews';
  const CLEAR_CMD = 'очистка';

  let reviews = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const renderReview = ({ name, info }) => {
    const reviewEl = document.createElement('div');
    reviewEl.classList.add('otziv');

    const nameEl = document.createElement('h3');
    nameEl.classList.add('name');
    nameEl.textContent = name;

    const textEl = document.createElement('p');
    textEl.textContent = info;

    reviewEl.appendChild(nameEl);
    reviewEl.appendChild(textEl);
    reviewsContainer.appendChild(reviewEl);
  };

  reviews.forEach(renderReview);

  const clearAllReviews = () => {
    localStorage.removeItem(STORAGE_KEY);
    reviews = [];
    reviewsContainer.querySelectorAll('.otziv').forEach((el) => el.remove());
  };

  submitBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const info = infoInput.value.trim();

    if (name.toLowerCase() === CLEAR_CMD && info.toLowerCase() === CLEAR_CMD) {
      clearAllReviews();
      nameInput.value = '';
      infoInput.value = '';
      alert('Все отзывы удалены!');
      return;
    }

    if (!name || !info) {
      alert('Пожалуйста, заполните оба поля!');
      return;
    }

    const newReviewData = { name, info };
    renderReview(newReviewData);

    reviews.push(newReviewData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));

    nameInput.value = '';
    infoInput.value = '';
  });
});

