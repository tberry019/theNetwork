<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid bg-dark text-dark">
    <div class="row">
      <div class="col-10">
        <router-view />
      </div>
      <div class="col-2">
        <div class="mt-2 mb-3 px-5 rounded">
          <img
            v-for="b in banners"
            :key="b.title"
            style="max-height: 200px"
            :src="b.tall"
            alt="..."
          />
        </div>
      </div>
    </div>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by TaylorBerry
    </div>
  </footer>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "./AppState";
import { bannersService } from "./services/BannersService";
export default {
  name: "App",
  setup() {
    onMounted(() => {
      bannersService.getBanners();
    });
    return {
      appState: computed(() => AppState),
      // GET THE BANNERS FROM THE STATE
      banners: computed(() => AppState.banners),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
