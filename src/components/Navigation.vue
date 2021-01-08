<template>
  <nav class="navigation">
    <!--LOGO-->
    <div class="logo">
      <router-link to="/">
        <img src="../assets/images/icons/logo.svg" />
        <h2>Dev Helper</h2>
      </router-link>
    </div>

    <!--LINKS-->
    <div class="links">
      <div class="line"></div>

      <router-link to="/snippets">
        <font-awesome-icon icon="code" class="icon" />
        <span>Code Snippets</span>
      </router-link>

      <div class="line"></div>

      <router-link to="/buttons">
        <font-awesome-icon icon="dot-circle" class="icon" />
        <span>Buttons</span>
      </router-link>

      <div class="line"></div>
    </div>

    <!--SEARCH-->
    <div class="search">
      <input
        type="text"
        class="search-input"
        v-model="search"
        @keyup="searchSnippets"
      />
      <font-awesome-icon icon="search" class="icon icon-search" />
    </div>
  </nav>
</template>

<script>
import SnippetsService from "../services/SnippetsService";
import { mapActions } from "vuex";

export default {
  name: "Navigation",
  data: () => ({
    search: "",
    timeout: null
  }),
  methods: {
    searchSnippets() {
      clearTimeout(this.timeout);

      let self = this;
      if (self.search !== "") {
        this.SHOW_SPINNER();
        this.timeout = setTimeout(function() {
          self.getSnippetsByTitle(self.search);
        }, 300);
      } else {
        this.SHOW_SPINNER();
        this.UNFILTER_SNIPPETS();
        this.HIDE_SPINNER();
      }
    },
    async getSnippetsByTitle(title) {
      try {
        const response = await SnippetsService.getAllByTitle(title);
        this.FILTER_SNIPPETS(response.data);
        this.HIDE_SPINNER();
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions("snippets", [
      "FILTER_SNIPPETS",
      "UNFILTER_SNIPPETS",
      "SHOW_SPINNER",
      "HIDE_SPINNER"
    ])
  }
};
</script>

<style scoped lang="scss">
.navigation {
  z-index: 999;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  background-color: $dark-gray;
  margin: 0;
  display: grid;
  grid-template-columns: 180px 0.7fr 1fr;
  justify-content: space-between;
  align-items: center;
  padding: 0 $padding * 2;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

  .logo a {
    display: flex;
    align-items: center;
  }

  h2 {
    font-family: "Bebas Neue", sans-serif;
    font-size: 2rem;
    color: $primary;
    margin: $margin / 3 0 $margin / 3 15px;
  }
}

.links {
  margin-left: 10%;
  display: grid;
  grid-template-columns: 10px 1fr 10px 1fr 10px;
  justify-items: center;
  width: 100%;
  height: 100%;
  a {
    color: $white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  span {
    margin-top: 0.5em;
    font-weight: 600;
    padding-bottom: 5px;
    position: relative;
  }
}

.router-link-exact-active > .icon,
.router-link-exact-active > span {
  color: $accent;
}

.line {
  width: 1px;
  height: 100%;
  background-color: $dark;
}

.search {
  position: relative;
  width: 50%;
  margin: 1.5em 0;
  justify-self: end;
}

.search-input {
  width: 100%;
  outline: none;
  font-size: 1.5rem;
  padding: 7px 7px 7px 15px;
  border: 2px solid $white;
  background-color: transparent;
  color: $accent;
  border-radius: 30px;
}

.icon-search {
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>
