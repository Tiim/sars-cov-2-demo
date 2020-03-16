<template>
  <Layout>
    <h1 class="title">
      2020 SARS-COV-19 Tracker for Switzerland<img
        alt="Switzerland Emoji"
        src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/openmoji/213/flag-for-switzerland_1f1e8-1f1ed.png"
        class="icon is-large"
      />
    </h1>
    <Graph :data="data ? data.array : null" />
  </Layout>
</template>

<script>
import Graph from "./components/Graph";
import Layout from "./components/Layout";
import { fetchData } from "./data";
export default {
  name: "App",
  components: {
    Graph,
    Layout
  },
  data() {
    return { data: null };
  },
  async mounted() {
    this.data = await fetchData();
  }
};
</script>

<style></style>
