<template>
  <div class="row cover-image"></div>

  <div class="row my-4 text-light">
    <h1>{{ profile.name }}</h1>
    <p>{{ profile.bio }}</p>
    <p>{{ profile.linkedin }}</p>
    <p>{{ profile.class }}</p>
    <p>{{ profile.github }}</p>
    <p>{{ profile.resume }}</p>
    <p>Has this user graduated? {{ profile.graduated }}</p>
    <img class="rounded" height="30" :src="profile.picture" alt="" />

    <!-- FIXME add the profile bio/github link/linkedin/resume -->
    <div v-if="profile.id == account.id">
      <CreatePost />
    </div>
    <div class="row mt-4">
      <Post v-for="p in posts" :key="p.id" :post="p" />
    </div>
  </div>
  <div class="row d-flex">
    <div class="col-12"></div>

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
  <!-- FIXME add modal like car edit for edting profile object -->
</template>


<script>
import { computed, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";

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
      posts: computed(() => AppState.posts),
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
.creator-image {
  height: 10rem;
  width: 10rem;
}
</style>