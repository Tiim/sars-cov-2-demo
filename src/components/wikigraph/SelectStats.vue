<template>
  <div class="container">
    <button
      v-for="s in stats"
      :key="s"
      :class="{ item: true, selected: selected.includes(s) }"
      @click="select(s)"
    >
      {{ s }}
    </button>
    <button class="item close-button" @click="isClosed = !isClosed">
      {{ isClosed ? "Expand" : "Hide" }}
    </button>
  </div>
</template>

<script>
export default {
  name: "SelectStats",
  props: {
    data: { type: Array, required: false }
  },
  data() {
    return {
      selected: ["confirmedcases_new", "confirmedcases_total"],
      isClosed: true
    };
  },
  computed: {
    stats() {
      if (!this.data || !this.data.length) {
        return [];
      }
      if (!this.isClosed) {
        return Object.keys(this.data[0]).filter(
          s => !s.includes("date") && !s.includes("sources")
        );
      } else {
        return this.selected;
      }
    }
  },
  methods: {
    select(s) {
      if (!this.selected.includes(s)) {
        this.selected.push(s);
      } else {
        this.selected = this.selected.filter(sl => sl !== s);
      }
      this.$emit("selection", this.selected);
    }
  }
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
}
.item {
  display: flex;
  background: whitesmoke;
  border-radius: 4px;
  justify-content: center;
  border-width: 0px;
  padding: 5px;
}
.close-button {
  grid-column: 1 / -1;
}
.item:hover {
  background: lightblue;
}

.item.selected {
  background: lightseagreen;
  color: whitesmoke;
}
</style>
