<template>
  <div class="row">
    <div>
      <CreatePost />
    </div>
    <Post v-for="p in posts" :key="p.id" :post="p" />
  </div>
  <div class="row d-flex">
    <div class="col-2">
      <button @click="getMore(newerPosts)" :disabled="!newerPosts">
        get Newer
      </button>
    </div>
  </div>
  <div class="row d-flex">
    <div class="col-2">
      <button @click="getMore(olderPosts)" :disabled="!olderPosts">
        get Older
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getPosts();
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.log(error);
      }
    });
    return {
      posts: computed(() => AppState.posts),
      olderPosts: computed(() => AppState.older),
      newerPosts: computed(() => AppState.newer),
      getMore(url) {
        postsService.getMore(url);
      },
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
