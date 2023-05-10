const btn = document.querySelector('.btn');
const message = document.querySelector('.data');

let url = 'https://api.ipgeolocation.io/timezone?apiKey=7f603a86cc9045c786ce32ea36be0aa9';

btn.addEventListener('click', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      message.insertAdjacentHTML(
        'afterend',
        `Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`
      );

      try {
         fetch(
          `${url}&lat=${coords.latitude}&long=${coords.longitude}`,
          {mode: "no-cors"}
        )
          .then((res) =>  res.json())
          .then((data) => 
            data.insertAdjacentHTML(
              'afterend',
              `TimeZone: ${data.timezone}, Data & Time: ${data.date_time_txt}`
            )
          );
      } catch (error) {
        console.error('Ошибка', error);
      }
    });
  } else {
    data.insertAdjacentHTML('afterend', 'Доступ запрещён!');
  }
});
