<template>
  <article>
    <a :href="url.url" taget="_blank">{{ url.url }}</a> -
    <a :href="url.slug" taget="_blank">{{ url.slug }}</a>
  </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ShortUrl } from "@/server";

@Component({})
export default class ShortUrlListItem extends Vue {
  @Prop({ type: Object as () => ShortUrl }) url!: ShortUrl;
}
</script>

<style scoped>
article {
  padding: 1ch;
  margin: 2ch auto;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: #dddddd;
}

@media (min-width: 900px) {
  article {
    width: 50%;
  }
}
</style>
