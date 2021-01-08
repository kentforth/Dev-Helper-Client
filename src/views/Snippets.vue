<template>
  <div class="container">
    <!--PAGE TITLE-->
    <div class="page-title">
      <h1>Code Snippets</h1>
      <button class="btn-filter" @click="removeFilter" v-if="isFiltered">
        <span>Remove Filter</span>
        <font-awesome-icon icon="filter" class="icon fa-filter" />
      </button>
      <ButtonAdd @click="$router.push('/snippets/add')" />
    </div>

    <!--SNIPPETS LIST-->
    <div class="snippets">
      <SnippetItem v-for="snippet in allFilteredSnippets" :key="snippet._id">
        <router-link :to="/snippet/ + snippet._id">
          {{ snippet.title }}
        </router-link>

        <div class="tags">
          <Tag
            v-for="(tag, tagIndex) in snippet.tags"
            :key="tagIndex"
            @click.native="getSnippetsByTagName(tag)"
            >{{ tag }}</Tag
          >
        </div>
        <hr class="line" />
      </SnippetItem>
    </div>

    <h4 class="not-found" v-if="filteredSnippets.length === 0 && isSearching">
      No snippets found!
    </h4>

    <beat-loader
      :loading="isLoading"
      :color="spinnerColor"
      :size="spinnerSize"
      class="spinner"
    ></beat-loader>
  </div>
</template>

<script>
import ButtonAdd from "../components/ButtonAdd";
import SnippetItem from "../components/SnippetItem";
import axios from "axios";
import Tag from "../components/Tag";
import SnippetsService from "../services/SnippetsService";
import { mapState, mapActions } from "vuex";
import BeatLoader from "vue-spinner/src/BeatLoader";

export default {
  name: "Snippets",
  components: { Tag, SnippetItem, ButtonAdd, BeatLoader },
  data: () => ({
    snippets: [],
    offset: 0,
    limit: 10,
    isFiltered: false,
    spinnerColor: "#C89FF4",
    spinnerSize: "24px"
  }),
  computed: {
    allFilteredSnippets() {
      if (this.isSearching) {
        return this.filteredSnippets;
      } else {
        return this.snippets;
      }
    },
    ...mapState("snippets", ["filteredSnippets", "isSearching", "isLoading"])
  },

  created() {
    this.SHOW_SPINNER();
    window.addEventListener("scroll", this.onScroll);
    this.getSnippetsOnScroll();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  methods: {
    ...mapActions("snippets", ["SHOW_SPINNER", "HIDE_SPINNER"]),
    async getSnippetsOnScroll() {
      let snippets = await axios.get(
        `${process.env.VUE_APP_API_URI}snippets?offset=${this.offset}&limit=${this.limit}`
      );
      this.snippets.push(...snippets.data);
      this.HIDE_SPINNER();
    },
    async getSnippets() {
      let snippets = await axios.get(
        `${process.env.VUE_APP_API_URI}snippets?offset=${this.offset}&limit=${this.limit}`
      );
      this.snippets = snippets.data;
    },
    onScroll() {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.offset += 10;
        this.getSnippetsOnScroll();
      }
    },
    async getSnippetsByTagName(name) {
      this.SHOW_SPINNER();
      try {
        const response = await SnippetsService.getAllByTagName(name);
        this.snippets = response.data;
        this.isFiltered = true;
        this.HIDE_SPINNER();
      } catch (error) {
        console.log(error);
      }
    },
    removeFilter() {
      this.SHOW_SPINNER();
      this.getSnippets();
      this.isFiltered = false;
      this.HIDE_SPINNER();
    }
  }
};
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  width: 50%;
  margin: 0;
  justify-self: end;
}

.snippets {
  width: 100%;
  padding: 1.5em;
  border-radius: 6px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  background-color: $dark-gray;
  margin-bottom: 2em;
}

.page-title {
  width: 100%;
  margin: 2em auto;
  display: grid;
  grid-template-columns: 1fr 0.4fr 100px;
  justify-content: center;
  align-items: center;
}

.btn-filter {
  width: 50%;
  background-color: $pink;
  border: none;
  outline: none;
  border-radius: 30px;
  display: flex;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    font-weight: 600;
    font-size: 1.2rem;
    color: $dark;
  }
}

.fa-filter {
  color: $dark;
  margin-left: 10px;
}

.add-btn {
  grid-column: 3/3;
}

.not-found {
  position: absolute;
  top: 27%;
  left: 42%;
  font-size: 2rem;
  color: orangered;
}

.spinner {
  position: absolute;
  top: 25%;
  left: 50%;
  z-index: 999;
}
</style>
