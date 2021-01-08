<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="container">
      <button class="btn-delete" @click="deleteSnippet">
        <span>Delete</span>
        <font-awesome-icon icon="trash" class="icon fa-trash" />
      </button>
    </div>

    <div class="tags">
      <Tag v-for="(tag, index) in tags" :key="index">{{ tag }}</Tag>
    </div>
    <div class="steps">
      <Step v-for="(step, index) in steps" :key="step.title">
        <label for="text">{{ step.title }}</label>
        <textarea id="text" rows="6" v-model="step.text"></textarea>
        <font-awesome-icon
          icon="clone"
          class="icon"
          @click="copyStep(index, step.text)"
        />
        <span :class="{ copy: activeElement === index }">Copied!</span>
      </Step>
    </div>
  </div>
</template>

<script>
import Step from "../components/Step";
import SnippetsService from "../services/SnippetsService";
import Tag from "../components/Tag";
export default {
  name: "SnippetDetail",
  components: { Tag, Step },
  data: () => ({
    title: "",
    steps: [],
    activeElement: undefined,
    tags: []
  }),
  created() {
    this.getSnippetById();
  },
  methods: {
    async getSnippetById() {
      try {
        let snippet = await SnippetsService.get(this.$route.params.id);
        this.title = snippet.data.title;
        this.steps = snippet.data.steps;
        this.tags = snippet.data.tags;
      } catch (error) {
        console.log(error);
      }
    },
    async copyStep(index, text) {
      this.activeElement = index;
      await navigator.clipboard.writeText(text);
    },
    async deleteSnippet() {
      try {
        const response = await SnippetsService.delete(this.$route.params.id);
        if (response.status === 200) {
          this.$toast.success("Snippet has been deleted", {
            duration: 2000,
            position: "bottom"
          });
          this.$router.push("/snippets");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
}

.steps {
  width: 40%;
  margin: 0 auto;
  padding-bottom: 2em;
}

.icon {
  cursor: pointer;
  grid-column: 2/2;
  grid-row: 2/2;
  margin-left: 20px;
}

.tags {
  display: flex;
  margin: 0 auto;
  width: 30%;
}

.steps span {
  color: $green;
  opacity: 0;
  transition: all 0.2s ease;
}

.copy {
  opacity: 1 !important;
}

.btn-delete {
  display: flex;
  margin-left: auto;
  background-color: $accent;
  padding: 0.5em 1.6em;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 30px;

  span {
    color: $white;
    font-weight: 600;
    font-size: 1.4rem;
  }
}

.fa-trash {
  color: $white;
}
</style>
