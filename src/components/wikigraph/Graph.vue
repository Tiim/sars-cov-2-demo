<template>
  <div>
    <SelectStats @selection="selected" :data="data" />
    <div class="chart-container">
      <LaCartesian
        v-if="data.length"
        autoresize
        :data="data"
        :width="width * 0.8"
      >
        <LaArea v-for="val in values" :key="val" :prop="val" dot :label="val" />
        <la-x-axis prop="date" :interval="Math.ceil(3 * (data.length / 20))" />
        <la-y-axis :interval="10" />
        <la-tooltip />
      </LaCartesian>
      <div v-else class="spinner-container">
        <PulseLoader />
      </div>
    </div>
  </div>
</template>

<script>
import { Cartesian, Line, XAxis, YAxis, Tooltip } from "laue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import SelectStats from "./SelectStats";
import { fetchData } from "../../data";

export default {
  name: "Chart",
  components: {
    LaCartesian: Cartesian,
    LaArea: Line,
    LaXAxis: XAxis,
    LaYAxis: YAxis,
    LaTooltip: Tooltip,
    SelectStats,
    PulseLoader
  },
  data() {
    return {
      values: ["confirmedcases_new", "confirmedcases_total"],
      width: screen.width,
      data: []
    };
  },
  methods: {
    selected(arr) {
      this.values.splice(0, this.values.length, ...arr);
    }
  },
  async mounted() {
    const entries = await fetchData();
    console.log(entries.array);
    this.data.splice(0, this.data.length, ...entries.array);
  }
};
</script>

<style scoped>
.chart-container {
  min-height: 300px;
  display: grid;
  justify-content: center;
  align-content: center;
}
.spinner-container {
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
}
</style>
