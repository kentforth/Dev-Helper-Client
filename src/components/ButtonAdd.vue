<template>
  <button class="add-btn" @click="$emit('click')">
    <font-awesome-icon icon="plus" class="fa-plus" />
  </button>
</template>

<script>
export default {
  name: "ButtonAdd"
};
</script>

<style scoped lang="scss">
.add-btn {
  outline: none;
  cursor: pointer;
  width: 4em;
  height: 4em;
  background-color: $green;
  border: none;
  border-radius: 30px;
  filter: drop-shadow(0px 4px 10px rgba(10, 9, 9, 0.5));
}

.fa-plus {
  color: $white;
  width: 30px;
}
</style>
