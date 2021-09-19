const fetch = require("node-fetch");

const fetchWeather = async () => {
  let bubble = [];
  let position = [];
  let MaxT = [];
  let MinT = [];
  let Pop = [];
  let Weather = [];
  let location = [];
  let Tomorrow = [];
  let time = [];
  await fetch(
    `https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-E444C840-BB67-49DE-929A-7C987250A02D&downloadType=WEB&format=JSON`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let city = json["cwbopendata"]["dataset"]["location"];
      for (let i = 0, j = city.length; i < j; i++) {
        position.push(city[i].locationName);
      }
      for (let i = 0, p = position.length; i < p; i++) {
        for (let j = 0; j <= 4; j++) {
          switch (j) {
            case 0:
              Weather.push(
                city[i]["weatherElement"][j]["time"][0]["parameter"][
                  "parameterName"
                ]
              );
              break;
            case 1:
              MaxT.push(
                city[i]["weatherElement"][j]["time"][0]["parameter"][
                  "parameterName"
                ]
              );
              break;
            case 2:
              MinT.push(
                city[i]["weatherElement"][j]["time"][0]["parameter"][
                  "parameterName"
                ]
              );
              break;
            case 4:
              Pop.push(
                city[i]["weatherElement"][j]["time"][0]["parameter"][
                  "parameterName"
                ]
              );
              break;
          }
        }
      }
      location.push(
        {
          Weather: Weather,
        },
        {
          MaxT: MaxT,
        },
        {
          MinT: MinT,
        },
        {
          Pop: Pop,
        }
      );
    });
  return location;
};
module.exports = fetchWeather;
