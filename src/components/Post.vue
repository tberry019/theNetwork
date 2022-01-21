<template>
  <h6>welcome to the post page</h6>
  <img
    :src="post.postImg"
    :data-bs-target="'#post-' + post.id"
    data-bs-toggle="modal"
    class="rounded selectable post-image"
    alt=""
  />
  <Modal :id="'post-' + post.id">
    <template #modal-title>
      <h4>{{ post.title }}</h4>
    </template>
    <template #modal-body>
      <div class="row cover-image"></div>
      <div class="row justify-content-center">
        <h4 class="text-center my-2">Posts</h4>
        <PostImg v-for="p in post.ostImgs" :key="p.id" :image="p" />
      </div>
      <div class="row my-3">
        <div class="col-12">
          <div
            class="d-flex align-items-center selectable"
            @click="goToProfile()"
          >
            <img
              :src="post.creator.picture"
              class="creator-image rounded-circle"
              alt=""
            />
            <div v-if="post.creator">
              <h4 class="ms-4">{{ post.creator?.name }}</h4>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>


<script>
import { computed } from "@vue/reactivity";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      coverImg: computed(() => `url(${props.post.coverImg})`),
    };
  },
};
</script>


<style lang="scss" scoped>
.post-image {
  // NOTE the variable used here needs to already be formatted for css before you try to use it here
  background-image: v-bind(postImg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 50vh;
}
.cover-image {
  // NOTE the variable used here needs to already be formatted for css before you try to use it here
  background-image: v-bind(coverImg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 50vh;
}
</style>