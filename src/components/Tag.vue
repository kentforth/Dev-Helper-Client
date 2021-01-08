<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "Tag"
};
</script>

<style scoped lang="scss">
span {
  background-color: $secondary;
  color: $white;
  padding: 5px 10px;
  border-radius: 30px;
  font-size: 1rem;
  margin-right: 15px;
  cursor: pointer;
}
</style>
