<template>
  <div class="snippet-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SnippetItem"
};
</script>

<style scoped lang="scss">
.snippet-item {
  margin-bottom: 1em;
}

.snippet-item a {
  margin-top: 0;
  margin-bottom: 0.3em;
  display: inline-block;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 600;
  color: $accent;
  transition: all 0.3s ease;
}

.snippet-item a:hover {
  color: #cb532d;
}

.snippet-item > .tags {
  margin-top: 1em;
}

.snippet-item > .line {
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 1.5em;
}
</style>
