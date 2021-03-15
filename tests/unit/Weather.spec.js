import Weather from "@/components/Weather.vue";
import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";

const MOCK_CITY_NAME = "Pune";
const MOCK_CITY_COUNTRY = "India";
const MOCK_CITY_FORECAST = [30, 33, 34, 35, 37, 31, 32];

jest.mock("axios", () => ({
  get: () =>
    Promise.resolve({
      data: {
        data: [
          { temp: MOCK_CITY_FORECAST[0] },
          { temp: MOCK_CITY_FORECAST[1] },
          { temp: MOCK_CITY_FORECAST[2] },
          { temp: MOCK_CITY_FORECAST[3] },
          { temp: MOCK_CITY_FORECAST[4] },
          { temp: MOCK_CITY_FORECAST[5] },
          { temp: MOCK_CITY_FORECAST[6] },
        ],

        city_name: MOCK_CITY_NAME,
        country_code: MOCK_CITY_COUNTRY,
      },
    }),
}));
describe("Weather.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Weather);
  });
  it("set the city name", async () => {
    await wrapper.find("input").setValue(MOCK_CITY_NAME);
    expect(wrapper.vm.city).toBe(MOCK_CITY_NAME);
  });

  it("trigger the keydown event and check temp", async () => {
    wrapper.find("input").trigger("keyup.enter");
    await flushPromises();

    expect(wrapper.vm.weather).toBe(MOCK_CITY_FORECAST[0]);
  });
  it("trigger the keydown event and check city", async () => {
    wrapper.find("input").trigger("keyup.enter");
    await flushPromises();

    expect(wrapper.vm.city_name).toBe(MOCK_CITY_NAME);
  });
  it("trigger the keydown event and check country", async () => {
    wrapper.find("input").trigger("keyup.enter");
    await flushPromises();

    expect(wrapper.vm.country).toBe(MOCK_CITY_COUNTRY);
  });
  it("trigger the keydown event and check forecast", async () => {
    wrapper.find("input").trigger("keyup.enter");
    await flushPromises();
    expect(wrapper.vm.forecast).toStrictEqual(MOCK_CITY_FORECAST);
  });
  it("Ui Temperature Text Testing", async () => {
    wrapper.find("input").trigger("keyup.enter");
    await flushPromises();
    expect(wrapper.find(".temp").text()).toContain(MOCK_CITY_FORECAST[0]);
  });
  it("Ui City And Country Text Testing", async () => {
    wrapper.find("input").trigger("keyup.enter");
    await flushPromises();
    expect(wrapper.find(".location").text()).toEqual(
      `${MOCK_CITY_NAME},${MOCK_CITY_COUNTRY}`
    );
  });
  it("Forecast Testing", async () => {
    wrapper.find("input").trigger("keyup.enter");

    await flushPromises();
    for (let index = 0; index < MOCK_CITY_FORECAST.length; index++) {
      expect(wrapper.find(`[id='${index}']`).text()).toEqual(
        `${MOCK_CITY_FORECAST[index]}`
      );
    }
  });
});
