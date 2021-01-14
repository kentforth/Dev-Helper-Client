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
        <label for="text" v-if="step.title !== ''">{{ step.title }}</label>
        <textarea id="text" rows="6" v-model="step.text"></textarea>
        <font-awesome-icon
          icon="clone"
          class="icon"
          @click="copyStep(index, step.text)"
        />
        <span :class="{ copy: activeElement === index }">Copied!</span>
      </Step>
    </div>

    <div class="images" v-if="hasImages">
      <img
        :src="
          `https://res.cloudinary.com/kentforth/image/upload/${image.public_id}.${image.format}`
        "
        alt=""
        v-for="image in images"
        :key="image.public_id"
      />
    </div>
  </div>
</template>

<script>
import Step from "../components/Step";
import SnippetsService from "../services/SnippetsService";
import Tag from "../components/Tag";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "SnippetDetail",
  components: { Tag, Step },
  data: () => ({
    title: "",
    steps: [],
    images: [],
    hasImages: false,
    activeElement: undefined,
    tags: []
  }),

  created() {
    this.getSnippetById();
  },
  methods: {
    ...mapActions("snippets", ["SHOW_SPINNER", "HIDE_SPINNER"]),
    getImagesFromCloudinary() {
      try {
        axios
          .get(`${process.env.VUE_APP_CLOUDINARY_IMAGE_LIST}${this.title}.json`)
          .then(response => {
            this.images = response.data.resources;
            this.HIDE_SPINNER();
          });
      } catch (error) {
        console.log(error);
      }
    },
    async getSnippetById() {
      this.SHOW_SPINNER();
      try {
        let snippet = await SnippetsService.get(this.$route.params.id);
        this.title = snippet.data.title;
        this.steps = snippet.data.steps;
        this.tags = snippet.data.tags;
        this.hasImages = snippet.data.hasImages;
        if (this.hasImages) {
          this.getImagesFromCloudinary();
        }
      } catch (error) {
        console.log(error);
      }
    },
    copyStep(index, stepText) {
      this.activeElement = index;
      navigator.clipboard.writeText(stepText);
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

.images {
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 3em;
  justify-items: center;
  padding-bottom: 3em;

  img {
    width: 700px;
    height: 600px;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 0 18px 0 #000000;
  }
}
</style>
