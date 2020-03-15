<template>
  <div>
    <SelectStats @selection="selected" :data="data" />
    <div class="chart-container">
      <D3LineChart v-if="data" :config="config" :datum="data" />
    </div>
  </div>
</template>

<script>
import { D3LineChart } from "vue-d3-charts";
import SelectStats from "./SelectStats";
export default {
  name: "Chart",
  components: { D3LineChart, SelectStats },
  props: {
    data: { type: Array, required: false }
  },
  data() {
    return {
      config: {
        date: { key: "date", inputFormat: "%Y-%m-%d" },
        axis: {
          xTicks: Math.min(this.data?.length, 20)
        },
        color: {
          scheme: "schemeCategory10"
        },
        values: []
      }
    };
  },
  methods: {
    selected(arr) {
      this.config.values.splice(0, this.config.values.length, ...arr);
      console.log(this.config);
    }
  }
};
</script>

<style>
.chart-container {
  height: 300px;
}
</style>
