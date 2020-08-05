<template>
  <section>
    <ShortUrlListItem v-for="url in urls" :url="url" :key="url.id" />
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ShortUrl } from "@/server";
import ShortUrlListItem from "@/components/ShortUrlListItem.vue";

@Component({ components: { ShortUrlListItem } })
export default class ShortUrlList extends Vue {
  @Prop({ type: Array as () => ShortUrl[] }) urls!: ShortUrl[];
}
</script>
