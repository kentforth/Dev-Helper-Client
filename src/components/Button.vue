<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button"
};
</script>

<style scoped lang="scss">
.btn {
  font-size: 2rem;
  color: $white;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  border: none;
  padding: 0.3em 0.5em;
  border-radius: 30px;
  font-family: "Montserrat", sans-serif;
  background: linear-gradient(90deg, #f27a54 0%, #a154f2 100%);
}
</style>
