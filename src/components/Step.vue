<template>
  <div class="step">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Step"
};
</script>

<style scoped lang="scss">
label {
  color: $text-label;
  margin-bottom: 0.5em;
}
.step {
  margin-top: 2em;
  display: grid;
  grid-template-columns: 1fr 100px;
}

label {
  font-size: 1.2rem;
}

textarea {
  resize: none;
  outline: none;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 8px;
  grid-row: 2/2;
  color: $white;
  border: 2px solid $white;
  border-radius: 4px;
  background-color: $secondary;
  font-family: "Roboto", sans-serif;
}
</style>
