<template>
  <Layout>
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
