import { shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Weather from "@/components/Weather.vue";
jest.mock("axios", () => ({
  get: () =>
    Promise.resolve({
      data: {
        temp: "30",
      },
    }),
}));
describe("Weather.vue", () => {
  it("mock temperature data", async () => {
    var wrapper = shallowMount(Weather);
    await flushPromises();
    expect(wrapper.vm.weather).toBe("30");
  });
});
