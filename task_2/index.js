let icon_1 = document.querySelector('.icon_1');
let icon_2 = document.querySelector('.icon_2');
let btn = document.querySelector('.j-btn-request');

btn.addEventListener('click', () => {
    icon_1.classList.toggle('hide');
    icon_2.classList.toggle('hide');
})