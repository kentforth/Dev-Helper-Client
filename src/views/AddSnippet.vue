<template>
  <div class="add-snippet">
    <div class="container">
      <!--PAGE TITLE-->
      <div class="page-title">
        <button class="btn-back" @click="$router.push('/snippets')">
          <font-awesome-icon icon="chevron-left" class="fa-back" />
          <span>Back</span>
        </button>
        <h1>Add Snippet</h1>
      </div>

      <!--FORM-->
      <div class="container">
        <div class="input-element">
          <label for="title"></label>
          <input type="text" id="title" class="input" v-model="snippetTitle" />
          <div class="border"></div>
        </div>

        <form action="" @submit.prevent="addSnippet" class="form">
          <div class="steps">
            <div
              class="step-item"
              v-for="(step, stepIndex) in steps"
              :key="stepIndex"
            >
              <label for="step" class="label">{{ step.title }}</label>
              <textarea
                id="step"
                class="input"
                rows="4"
                v-model="step.text"
              ></textarea>
              <font-awesome-icon
                icon="trash"
                class="fa-trash"
                @click="removeStep(stepIndex)"
              />
            </div>

            <button class="btn-add-tag" @click="addStep" type="button">
              <span>Add Step</span>
              <font-awesome-icon icon="plus" class="fa-plus" />
            </button>
          </div>

          <div class="tags">
            <label for="tag" class="label">Add Tag</label>
            <div class="input-element">
              <input type="text" id="tag" class="input" v-model="tagName" />
              <div class="border"></div>
            </div>
            <button class="btn-add-tag" @click="addTag" type="button">
              <span>Add Tag</span>
              <font-awesome-icon icon="plus" class="fa-plus" />
            </button>

            <div class="tags-list">
              <div
                class="tag-item"
                v-for="(tagItem, index) in tags"
                :key="index"
              >
                <font-awesome-icon
                  icon="times-circle"
                  class="fa-cross"
                  @click="removeTag(index)"
                />
                <span>{{ tagItem }}</span>
              </div>
            </div>

            <div class="images">
              <input
                type="file"
                multiple
                ref="files"
                @change="selectFiles"
                class="file-input"
                id="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
              />
              <label for="file">
                <span>Choose Images</span>
                <font-awesome-icon icon="cloud-upload-alt" class="fa-upload" />
              </label>

              <div
                v-for="(file, index) in files"
                class="image-item"
                :key="index"
              >
                <p>{{ file.name }}</p>
              </div>
            </div>
          </div>

          <beat-loader
            :loading="isLoading"
            :color="spinnerColor"
            :size="spinnerSize"
            class="spinner"
          ></beat-loader>

          <Button class="btn-add-snippet">
            Create Snippet
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SnippetsService from "../services/SnippetsService";
import Button from "../components/Button";
import BeatLoader from "vue-spinner/src/BeatLoader";
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "AddSnippet",
  components: { Button, BeatLoader },
  data: () => ({
    cloudinaryPreset: "dev-helper",
    tagName: "",
    spinnerColor: "#C89FF4",
    spinnerSize: "24px",
    tags: [],
    steps: [],
    hasImages: false,
    stepCounter: 1,
    imageCounter: 0,
    stepTitle: "",
    snippetTitle: "",
    files: [],
    images: [],
    step: {
      title: `Step 1`,
      text: ""
    }
  }),
  computed: {
    ...mapState("snippets", ["isLoading"])
  },
  mounted() {
    this.steps.push(this.step);
  },
  methods: {
    ...mapActions("snippets", ["SHOW_SPINNER", "HIDE_SPINNER"]),
    selectFiles() {
      const files = this.$refs.files.files;
      this.files = [...this.files, ...files];
    },
    addStep() {
      this.stepCounter++;

      this.step = {
        title: `Step ${this.stepCounter.toString()}`,
        text: ""
      };
      this.steps.push(this.step);
      this.steps.forEach(function(step, index) {
        step.title = `Step ${index + 1}`;
      });
    },

    addTag() {
      if (this.tagName !== "") {
        this.tags.push(this.tagName.toLowerCase());
        this.tagName = "";
      }
    },

    removeTag(index) {
      this.tags.splice(index, 1);
    },

    removeStep(index) {
      this.steps.splice(index, 1);
      this.steps.forEach(function(step, index) {
        step.title = `Step ${index + 1}`;
      });
    },

    async createSnippetInDatabase() {
      this.hasImages = !!this.files.length;
      const response = await SnippetsService.create({
        title: this.snippetTitle,
        tags: this.tags,
        steps: this.steps,
        hasImages: this.hasImages
      });

      if (response.status === 201) {
        this.$toast.success("Snippet is created", {
          duration: 2500,
          position: "bottom"
        });
      } else {
        console.log(response);
      }
    },

    async addSnippet() {
      Object.values(this.files).forEach(file => {
        let number = this.imageCounter++;
        let fileName = this.snippetTitle
          .split(" ")
          .join("")
          .toLowerCase();
        fileName = fileName + "_" + number;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", this.cloudinaryPreset);
        formData.append("public_id", fileName);
        formData.append("tags", this.snippetTitle.toLowerCase());
        this.SHOW_SPINNER();
        axios
          .post(`${process.env.VUE_APP_CLOUDINARY_UPLOAD_URL}`, formData)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      });
      await this.HIDE_SPINNER();
      await this.createSnippetInDatabase();
      await this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding-bottom: 2em;
}

.page-title {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  margin: 2em 0 2em 0;
}

h1 {
  text-align: center;
}

span {
  font-size: 1.4rem;
  font-weight: 600;
  margin-left: 10px;
  color: $white;
}

.btn-back {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 150px;
  background: linear-gradient(90deg, #f27a54 0%, #a154f2 100%);
  border-radius: 30px;
  outline: none;
  cursor: pointer;
  border: none;
  font-family: "Montserrat", sans-serif;
}

.fa-back {
  width: 17px;
  color: $white;
}

.form {
  width: 70%;
  margin: 2em auto 0 auto;
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10%;
}

.label {
  color: $text-label;
  font-weight: 400;
  margin-bottom: 10px;
}

.input {
  outline: none;
  font-size: 1.4rem;
  padding: 5px;
  background-color: $white;
  border: 3px solid $white;
  border-radius: 4px;
  color: $dark;
  font-weight: 600;
  width: 100%;
}

.input-element {
  position: relative;
  width: 100%;
}

.border {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: $white;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  transition: all 0.2s linear;
}

.input:focus + .border {
  background-color: $green;
}

.tags {
  display: flex;
  flex-direction: column;
}

.btn-add-tag {
  margin: 1em auto;
  font-size: 1.6rem;
  font-weight: 700;
  width: 40%;
  cursor: pointer;
  background-color: $green;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  border-radius: 4px;

  span {
    color: $dark;
    font-weight: 700;
  }
}

.btn-add-tag:active {
  transform: translateY(3px);
}

.fa-plus {
  color: $dark;
  font-size: 25px;
  margin-left: 10px;
}

.fa-cross {
  width: 15px;
  position: relative;
  top: -25%;
  left: 90%;
  color: $white;
  cursor: pointer;
}

.fa-trash {
  font-size: 25px;
  color: $accent;
  cursor: pointer;
  order: 2;
  grid-row: 2/2;
  grid-column: 2/2;
  margin: 10px 0 0 20px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
}

.tag-item {
  height: 60px;
  position: relative;
  span {
    background-color: $secondary;
    padding: 3px 20px;
    border-radius: 30px;
    font-weight: 400;
  }
}

.step-item {
  margin-bottom: 1.5em;
  display: grid;
  grid-template-columns: 1fr 50px;
  grid-template-rows: 30px 1fr;

  textarea {
    columns: 1/2;
    resize: none;
    grid-column: 1/2;
  }
}

.images {
  input[type="file"] {
    display: none;
  }

  label {
    margin-top: 1em;
    color: white;
    height: 60px;
    background-color: $secondary;
    padding: 0.5em;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    width: 60%;
    border-radius: 4px;
  }
}

.fa-upload {
  margin-left: 10px;
  font-size: 2rem;
}

.image-item p {
  color: $pink;
}

.btn-add-snippet {
  grid-column: span 2;
  justify-self: center;
  margin-top: 2em;
}

.spinner {
  position: absolute;
  top: 65%;
  left: 70%;
}
</style>
