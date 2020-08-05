<template>
  <main id="app">
    <ShortUrlForm @submit="onShortUrlSubmit" />
    <ShortUrlList :urls="urls" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  ListRouteResponse,
  IncomingShortUrlData,
  ShortUrl,
  ErrorResponse,
  CreateRouteResponse
} from "./server";
import ShortUrlForm from "@/components/ShortUrlForm.vue";
import ShortUrlList from "@/components/ShortUrlList.vue";

@Component({ components: { ShortUrlForm, ShortUrlList } })
export default class App extends Vue {
  urls: ShortUrl[] = [];

  async sendData(data: IncomingShortUrlData) {
    const res = await fetch("/api/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const body = await res.json();
    if (!res.ok) {
      throw new Error((body as ErrorResponse).msg);
    }
    return (body as CreateRouteResponse).data;
  }

  async onShortUrlSubmit(data: IncomingShortUrlData) {
    try {
      const newShortUrl = await this.sendData(data);
      alert("Short URL created successfully!");
      this.urls = [...this.urls, newShortUrl];
    } catch (error) {
      alert("Something went wrong :/");
    }
  }

  async mounted() {
    const response = await fetch("/api/url");
    const { data } = (await response.json()) as ListRouteResponse;
    this.urls = data;
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
