<template>
  <div>
    <div v-if="allData.length">
      <div class="select">
        <select v-model="selectedCountryName">
          <option v-for="c in allCountries" :key="c.geoId">
            {{ c.countryName }}
          </option>
        </select>
      </div>
      <div>
        <LaCartesian
          v-if="selectedData.length"
          autoresize
          :data="selectedData"
          :width="width * 0.8"
        >
          <LaArea prop="cases" dot label="New Cases" />
          <LaArea prop="deaths" dot label="New Deaths" />
          <la-x-axis
            prop="date"
            :interval="Math.ceil(3 * (allData.length / 20))"
          />
          <la-y-axis :interval="10" />
          <la-tooltip />
        </LaCartesian>
      </div>
    </div>
    <div v-else class="spinner-container">
      <PulseLoader />
    </div>
  </div>
</template>

<script>
import { Cartesian, Line, XAxis, YAxis, Tooltip } from "laue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "GraphInt",
  components: {
    LaCartesian: Cartesian,
    LaArea: Line,
    LaXAxis: XAxis,
    LaYAxis: YAxis,
    LaTooltip: Tooltip,
    PulseLoader
  },
  data() {
    return {
      allCountries: [],
      selectedCountryName: "Switzerland",
      allData: [],
      width: screen.width
    };
  },
  computed: {
    selectedCountry() {
      return this.allCountries.find(
        c => c.countryName === this.selectedCountryName
      );
    },
    selectedData() {
      console.log(this.selectedCountry);
      const runningTotal = {
        cases: 0,
        deaths: 0
      };
      const d = this.allData
        .map(entry => {
          const cases = entry[this.selectedCountry.geoId]?.newCases;
          const deaths = entry[this.selectedCountry.geoId]?.newDeaths;
          runningTotal.cases += cases || 0;
          runningTotal.deaths += deaths || 0;
          return {
            date: entry.date,
            cases,
            deaths,
            totalCases: runningTotal.cases,
            totalDeaths: runningTotal.deaths
          };
        })
        .filter(e => e.totalCases !== 0 || e.totalDeaths !== 0);
      return d;
    }
  },
  async mounted() {
    this.allCountries = await fetch(
      "https://raw.githubusercontent.com/Tiim/daily-coronavirus-stats/data/countries.json"
    ).then(res => res.json());
    this.allData = await fetch(
      "https://raw.githubusercontent.com/Tiim/daily-coronavirus-stats/data/data.json"
    ).then(res => res.json());
  }
};
</script>

<style scoped>
.spinner-container {
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
}
</style>
