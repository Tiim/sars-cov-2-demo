<template>
  <div class="container">
    <footer class="footer">
      <div class="content">
        <p>&copy;Tim Bachmann {{ year }}</p>
        <p>
          <i>
            Open source demo. Source data:
            <br />
            Data for Switzerland:
            <a
              href="https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Switzerland"
            >
              Wikipedia </a
            ><br />
            International data:
            <a
              href="https://www.ecdc.europa.eu/en/publications-data/download-todays-data-geographic-distribution-covid-19-cases-worldwide"
              >ecdc.europa.eu</a
            >
            via
            <a href="https://github.com/Tiim/daily-coronavirus-stats"
              >Github Repo</a
            >
          </i>
        </p>
        <p>
          <i>
            View this website on
            <a href="https://github.com/Tiim/Tiim.github.io">GitHub</a>!
          </i>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
