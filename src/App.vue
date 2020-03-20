<template>
  <Layout>
    <h1 class="title">
      2020 SARS-COV-19 Tracker
    </h1>
    <div class="section">
      <button @click="state = 'international'" :class="{ button: true }">
        International Statistics
      </button>
      <button @click="state = 'switzerland'" :class="{ button: true }">
        Switzerland Statistics
      </button>
    </div>
    <WikiGraph v-if="state == 'switzerland'" />
    <IntGraph v-if="state == 'international'" />
  </Layout>
</template>

<script>
import IntGraph from "./components/apigraph/Graph";
import WikiGraph from "./components/wikigraph/Graph";
import Layout from "./components/Layout";
export default {
  name: "App",
  components: {
    IntGraph,
    WikiGraph,
    Layout
  },
  data() {
    return {
      state: "international"
    };
  }
};
</script>

<style></style>
