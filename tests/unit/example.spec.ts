import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("renders h1", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.text()).toMatch("Hola");
  });
});
