<template>
  <div>
    <Header />
    <div class="section">
      <div class="container">
        <slot />
      </div>
    </div>
    <div class="section has-text-centered">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
export default {
  name: "Layout",
  components: {
    Header,
    Footer
  }
};
</script>
