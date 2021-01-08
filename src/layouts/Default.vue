<template>
  <div>
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
export default {
  name: "Default",
  components: { Navigation }
};
</script>

<style scoped></style>
