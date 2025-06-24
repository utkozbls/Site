const slider = document.querySelector('.slider');
const slides = document.querySelector('.slides');
const slideWidth = document.querySelector('.slide').offsetWidth;
const nextbut = document.querySelector('.custom-next');
const predbut = document.querySelector('.custom-prev');

let counter = 0;
 
function slideNext() {
 counter++;
 if (counter >= slides.children.length) {
 counter = 0;
 }
 slides.style.transform = `translateX(${-counter * slideWidth}px)`;
 }

function slidePrev() {
 counter--;
 if (counter < 0) {
 counter = slides.children.length - 1;
 }
 slides.style.transform = `translateX(${-counter * slideWidth}px)`;
 }

 setInterval(slideNext, 6000);

nextbut.addEventListener("click", slideNext);
predbut.addEventListener("click", slidePrev);



const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.3
});

const hiddenElements = document.querySelectorAll('.z1:not(:first-child)');

hiddenElements.forEach((el) => observer.observe(el));