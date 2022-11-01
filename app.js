const author = document.getElementById("author");

async function getUnsplashBackground() {
  try {
    const response = await fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    );
    const data = await response.json();
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    author.innerHTML = `By: ${
      data.user.social.twitter_username
        ? `<a href="https://www.instagram.com/${data.user.social.instagram_username}" target="_blank" title="Instagram">${data.user.name}</a>`
        : data.user.name
    }`;
  } catch (error) {
    console.error("ERROR! Could not find the Image. Try refreshing the page");
    document.body.style.backgroundImage = `url(https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjcyMzEwMTg&ixlib=rb-4.0.3&q=80)`;
  }
}

async function getCoinData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin"
    );
    const data = await response.json();
    document.querySelector(".coin-data").innerHTML = `
    <div style="display:flex;align-items:center;gap: 5px">
      <img src="${data.image.thumb}" alt="bitcoin logo" />
      <p>${data.name}</p>
      </div>
      <p>Current Price: $ ${data.market_data.current_price.usd}</p>
      <p>24 Hour <i class="fas fa-up-long"></i> : $ ${data.market_data.high_24h.usd}</p>
      <p>24 Hour <i class="fas fa-down-long"></i> : $ ${data.market_data.low_24h.usd}</p>

    `;
  } catch (error) {
    console.error("ERROR! Could not retrieve Coin Data");
  }
}

const getCurrentTime = () => {
  const date = new Date();
  return date.toLocaleTimeString("en-us", { timeStyle: "short" });
};

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
  )
    .then((response) => {
      if (!response.ok) {
        throw Error("Weather data not available");
      }
      return response.json();
    })
    .then((data) => {
      document.querySelector(".weather").innerHTML = `
      <div class="weather__inner">
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" />
            <h4>${data.main.temp}&deg;</h4>
            </div>
            <h2>${data.name}</h2>
          `;
    })
    .catch((err) => console.error(err));
});

const todos = () => {
  document.querySelector(".todo__body").classList.toggle("active");
  const todoValue = document.querySelector(".todo__body input");
  const ulEl = document.querySelector(".todo__body ul");
  document.getElementById("add__task").addEventListener("click", () => {
    ulEl.innerHTML += `<div class="list__item"><li>${todoValue.value}</li> <button class="delete__btn"><i class="fas fa-trash"></i></button></div>`;
    todoValue.value = "";
    document.querySelectorAll(".delete__btn").forEach((dltBtn) => {
      dltBtn.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.remove();
      });
    });
  });
};
getUnsplashBackground();
getCoinData();
setInterval(() => {
  document.getElementById("time").textContent = getCurrentTime();
}, 1000);
document.getElementById("todo").addEventListener("click", todos);
