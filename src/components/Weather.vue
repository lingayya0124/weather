<template>
  <div class="weather_main w-100">
    <div class="container">
      <div class="row mt-5 justify-content-center">
        <div class="col-6 City_input">
          <input
            type="text"
            class="form-control"
            v-model="city"
            placeholder="Enter your city"
            data-test="stuff"
            @keyup.enter="getWeather()"
            @keydown="show = false"
          />
        </div>
      </div>

      <div class="row justify-content-center">
        <transition name="fade">
          <div class="card-1 mt-5 w-50" v-if="show">
            <div class="row">
              <div class="col-6">
                <div class="temp">{{ Math.round(weather) }}&deg;</div>
                <div class="location mr-4">{{ city_name }},{{ country }}</div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div
        class="forecast row d-flex justify-content-center bd-dark"
        v-if="show"
      >
        <div class="col1" v-for="temp in forecast" :key="temp.index">
          {{ temp }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      show: false,
      enter: false,
      city_name: "",
      apikey: "84438c7c859649c993a353606d7e35f1",
      url: "http://api.weatherbit.io/v2.0/forecast/",
      city: "",
      weather: "",
      country: "",
      forecast: [],
    };
  },
  methods: {
    getWeather() {
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
        });
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

@media (max-width: 767px) {
  .temp {
    font-size: 3rem;
  }
}

.card-1 {
  background-image: url("../assets/sky-blue-background-cloud-clear-260nw-1386181790.webp");
  background-repeat: no-repeat;
  margin: 1rem;
  border-radius: 1.5rem;
  border-color: rgba(238, 237, 237, 0.438);
  box-shadow: 5px 8px 10px #80808033;
}

.col1 {
  width: 120px;
  height: 285px;
}
