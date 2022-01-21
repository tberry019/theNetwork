<template>
  <div class="row cover-image"></div>
  <div class="row my-4">
    <div v-if="profile.id == account.id">
      <CreatePost />
    </div>
  </div>
  <div class="row mt-4">
    <Post v-for="p in posts" :key="p.id" :post="p" />
  </div>
</template>


<script>
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      if (route.name == "Profile") {
        await profilesService.getProfile(route.params.id);
        await postsService.getPosts("?creatorId=" + route.params.id);
      }
    });
    return {
      account: computed(() => AppState.account),
      postss: computed(() => AppState.posts),
      profile: computed(() => AppState.profile),
      coverImg: computed(() => `url(${AppState.profile.coverImg})`),
    };
  },
};
</script>


<style lang="scss" scoped>
.cover-image {
  background-image: v-bind(coverImg);
  background-position: center;
  background-size: cover;
  height: 40vh;
}
</style>