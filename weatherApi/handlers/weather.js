const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// npm install node-fetch@^2.6.6

//app.get("/api/v1/weather/:city", weather.getCity);
let cache = {};

const getCity = async (req, res) => {
  let key = "2cf6f21794e165121aab02c23946cc7e";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${key}`;

  // let data = await fetch(url);
  // let weatherData = await data.json();
  // res.send(weatherData);
  const cache = {
    ohrid: {
      localCache: {},
      cacheTime: 1692992486658,
    },
    skopje: {
      localCache: {},
      cacheTime: 1692992504464,
    },
  };
  // test["ohrid"]
  //! So ovaj if proveruvame dali e zastarena datata, i posle kolku vreme da se brishi datata
  if (
    //! dali imame vo kashot kluc so imeto na gradot
    cache[req.params.city] &&
    //! dali vo objektot sto imame kluc i vremeto cacheTimeot ne e null
    cache[req.params.city].cacheTime !== null &&
    //! ako ne e null i  vremeto cacheTime < segasnoto za 60 sekundi izbrisi podatocite za toj grad
    cache[req.params.city].cacheTime + 60 * 1000 < new Date().getTime()
  ) {
    cache[req.params.city].localCache = null;
  }

  //! ako nemame grad vo kashot ili ako gradot so localCache = null  togash da se refetchnime so weather api
  if (!cache[req.params.city] || cache[req.params.city].localCache === null) {
    let data = await fetch(url);
    cache[req.params.city] = {
      localCache: await data.json(),
      cacheTime: new Date().getTime(),
    };
  }
  return res.send(cache);
};

module.exports = {
  getCity,
};

//? DOMSNA
//?
