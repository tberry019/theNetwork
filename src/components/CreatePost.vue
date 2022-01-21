<template>
  <form @submit.prevent="createPost()">
    <div
      class="
        row
        bg-dark
        justify-content-center
        align-items-center
        elevation-3
        my-3
      "
    >
      <div class="col-md-4 mb-2">
        <input
          type="text"
          class="form-control"
          placeholder="Title..."
          v-model="editable.title"
          required
        />
      </div>
      <div class="col-md-8 mb-2">
        <input
          type="text"
          class="form-control"
          placeholder="Cover Image..."
          v-model="editable.coverImg"
          required
        />
      </div>
      <div class="col-12 mb-2">
        <textarea
          type="text"
          class="form-control"
          placeholder="Post Images..."
          v-model="editable.postImgs"
          aria-describedby="helpId"
          required
        />
      </div>
      <div class="col-12 d-flex justify-content-end">
        <button class="btn btn-success">Create</button>
      </div>
    </div>
  </form>
</template>


<script>
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  setup() {
    const editable = ref({});
    return {
      editable,
      async createPost() {
        try {
          const formattedImgUrls = editable.value.postImgs
            .split(", ")
            .map((url) => url.trim());
          editable.value.postImgs = formattedImgUrls;
          await postsService.createPost(editable.value);
          editable.value = {};
          Pop.toast("Created Post!");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>