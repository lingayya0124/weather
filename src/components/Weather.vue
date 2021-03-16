<template>
  <div class="weather_main w-100">
    <div class="container">
      <div class="row mt-5 justify-content-center">
        <div class="col-5 City_input">
          <input
            type="text"
            class="form-control"
            v-model="city"
            placeholder="Enter your city"
            @keyup.enter="getWeather(), display_Days()"
            @input="show = false"
          />
        </div>
        <div class="col-0" @click="getWeather(), display_Days()">
          <img src="@/assets/search-solid.svg" />
        </div>
      </div>

      <div class="row justify-content-center">
        <transition name="fade">
          <div class="card-1 mt-5 w-50" v-if="show">
            <div class="row">
              <div class="col-9">
                <div class="temp">{{ Math.round(weather) }}&deg;</div>
                <div class="date"></div>
                <div class="location mr-4 mb-1">
                  <span
                    >{{
                      moment(new Date()).format("dddd, Do MMMM YYYY")
                    }} </span
                  ><br />{{ city_name }},{{ country }}
                </div>
              </div>
              <div class="col-1 float-right">
                <img class="current_img" src="@/assets/sun.png" />
              </div>
            </div>
          </div>
        </transition>
      </div>
      <table
        class="table table-dark table-hover table-responsive table-bordered"
        v-if="show"
      >
        <thead>
          <tr>
            <th v-for="day in days" :key="day.index">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="date in dates" :key="date.index">
              {{ date }}
              <br />

              <img src="@/assets/sun.png" />
            </td>
          </tr>
          <tr>
            <td v-for="temp in forecast" :key="temp.index">{{ temp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      days: [],
      show: false,
      enter: false,
      city_name: "",
      apikey: "84438c7c859649c993a353606d7e35f1",
      url: "http://api.weatherbit.io/v2.0/forecast/",
      city: null,
      weather: "",
      country: "",
      forecast: [],
      dates: [],
    };
  },
  methods: {
    getWeather() {
      if (this.city !== null) {
        this.forecast.length = 0;
        this.enter = true;
        this.show = true;
        axios
          .get(`${this.url}daily?&city=${this.city}&days=7&key=${this.apikey}`)
          .then((resp) => {
            this.weather = resp.data.data[0].temp;
            this.city_name = resp.data.city_name;
            this.country = resp.data.country_code;

            resp.data.data.forEach((dayTemp) => {
              this.forecast.push(dayTemp.temp);
            });
            console.log(moment(new Date()));
          });
      } else {
        alert("Enter City Name");
      }
    },

    display_Days() {
      this.days.length = 0;
      this.dates.length = 0;
      var daysRequired = 7;

      for (let i = 1; i <= daysRequired; i++) {
        this.days.push(moment().add(i, "days").format("dddd"));
        this.dates.push(moment().add(i, "days").format("Do MMMM YYYY"));
      }
      console.log(this.days);
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.temp {
  font-size: 5rem;
  color: rgb(57, 57, 58);
}
.location {
  font-size: 1rem;
}

.current_img {
  width: 100px;
  height: 100px;
}
@media (max-width: 767px) {
  .temp {
    font-size: 3rem;
  }
  .current_img {
    width: 50px;
    height: 50px;
  }
}
.far {
  width: 100px;
  height: 100px;
}
img {
  width: 50px;
  height: 50px;
}
.card-1 {
  background-image: url("../assets/sky-blue-background-cloud-clear-260nw-1386181790.webp");
  background-repeat: no-repeat;
  margin: 1rem;
  border-radius: 50px;
  border-color: rgba(238, 237, 237, 0.438);
  box-shadow: 5px 8px 10px #80808033;
}

.col1 {
  width: 120px;
  height: 285px;
}
td {
  vertical-align: bottom;
}
</style>