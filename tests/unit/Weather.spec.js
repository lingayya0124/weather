import Weather from "@/components/Weather.vue";
import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";

const MOCK_CITY_NAME = "Pune";
const MOCK_CITY_COUNTRY = "India";
const MOCK_CITY_TEMP = 30;

jest.mock("axios", () => ({
  get: () =>
    Promise.resolve({
      data: {
        data: [{
          temp: MOCK_CITY_TEMP,
        }],
        city_name: MOCK_CITY_NAME,
        country_code: MOCK_CITY_COUNTRY
      }
    }),
}));
describe("Weather.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Weather);
  })
  it("set the city name", async () => {
    await wrapper.find("input").setValue(MOCK_CITY_NAME);
    expect(wrapper.vm.city).toBe(MOCK_CITY_NAME);
  });


  it("trigger the keydown event and check temp", async () => {
    wrapper.find("input").trigger("keyup.enter");
    await flushPromises();

    expect(wrapper.vm.weather).toBe(MOCK_CITY_TEMP);
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
});
