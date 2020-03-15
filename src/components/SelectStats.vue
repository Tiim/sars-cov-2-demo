<template>
  <div class="container">
    <div
      v-for="s in stats"
      :key="s"
      :class="{ item: true, selected: selected.includes(s) }"
      @click="select(s)"
    >
      {{ s }}
    </div>
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
      selected: []
    };
  },
  computed: {
    stats() {
      if (!this.data || !this.data.length) {
        return [];
      }
      return Object.keys(this.data[0]);
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
}

.item:hover {
  background: lightblue;
}

.item.selected {
  background: lightseagreen;
  color: whitesmoke;
}
</style>
