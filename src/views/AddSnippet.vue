<template>
  <div class="addSnippet">
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
          </div>

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

export default {
  name: "AddSnippet",
  components: { Button },
  data: () => ({
    tagName: "",
    tags: [],
    steps: [],
    stepCounter: 1,
    stepTitle: "",
    snippetTitle: "",
    step: {
      title: `Step 1`,
      text: ""
    }
  }),

  mounted() {
    this.steps.push(this.step);
  },
  methods: {
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

    async addSnippet() {
      const response = await SnippetsService.create({
        title: this.snippetTitle,
        tags: this.tags,
        steps: this.steps
      });
      if (response.status === 201) {
        this.$toast.success("Snippet is created", {
          duration: 2500,
          position: "bottom"
        });
        this.$router.push("/");
      } else {
        console.log(response);
      }
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
  grid-gap: 10%;
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

.btn-add-snippet {
  grid-column: span 2;
  justify-self: center;
}
</style>
