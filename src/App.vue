<template>
  <div id="app">
    <h1>Hola</h1>
    <img alt="Vue logo" src="@/assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  message = "Hello world!";

  async mounted() {
    console.log(process.env);
    const response = await fetch("/api");
    const data = await response.json();
    console.log({ data });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
