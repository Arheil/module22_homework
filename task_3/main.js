const btn = document.querySelector('.btn');
const data = document.querySelector('.data');

btn.addEventListener('click', () => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  data.append(`Размер экрана: ширина: ${width}px высота: ${height}px`);

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      data.insertAdjacentHTML("afterend",`Координаты: ${coords.latitude}, ${coords.longitude}`);
    });
  } else {
    data.insertAdjacentHTML("afterend",'Информация о местоположении недоступна');
  }
});
