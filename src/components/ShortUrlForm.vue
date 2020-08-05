<template>
  <form @submit="onSubmit">
    <label for="url">URL</label>
    <input
      name="url"
      id="url"
      v-model="url"
      placeholder="Enter your URL"
      required
    />
    <button type="submit" :disabled="!isValid">Submit</button>
    <ul v-if="errors.length">
      <li v-for="(error, i) in errors" :key="i" class="error">{{ error }}</li>
    </ul>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { URL_REGEX } from "@/server/utils";
import { IncomingShortUrlData } from "../server";

@Component({})
export default class ShortUrlForm extends Vue {
  url = "";
  errors: string[] = [];
  isValid = false;

  @Watch("url")
  onUrlChanged(val: string) {
    this.errors = [];
    if (val && !val.match(URL_REGEX)) {
      this.isValid = false;
      this.errors.push("Should enter a valid URL");
    } else {
      this.isValid = true;
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.$emit("submit", { url: this.url } as IncomingShortUrlData);
  }
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}
form * {
  display: block;
  margin-bottom: 1ch;
  padding: 1ch;
}
input {
  margin-bottom: 2ch;
}
label {
  text-align: start;
}
.error {
  background-color: #fd6e6e;
  padding: 1ch;
  border-radius: 5px;
  text-decoration: none;
  list-style-type: none;
}

@media (min-width: 900px) {
  form,
  ul {
    width: 70%;
    margin: 0 auto;
  }
}
</style>
