import { shallowMount } from "@vue/test-utils";
import ShortUrlForm from "@/components/ShortUrlForm.vue";

describe("ShortUrlForm.vue", () => {
  it("works", () => {
    const wrapper = shallowMount(ShortUrlForm);
    expect(1).toBe(1);
  });
});
