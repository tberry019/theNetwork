<template>
  <div class="col-8 mt-2 mb-3 px-5 rounded">
    <div class="card selectable">
      <img
        style="max-height: 200px"
        :src="post.imgUrl"
        :data-bs-target="'#post-' + post.id"
        data-bs-toggle="modal"
        class="card-img-top rounded selectable post-image"
        alt="..."
        v-if="post.imgUrl"
      />
      <div class="card-body">
        <h4>{{ post.body }}</h4>
        <p class="card-text"></p>
        <!-- FIXME @click fire post request to service with url '.../api/posts/:id/like' -->
        <p>Created At {{ post.createdAt }}</p>
        <p>Likes: {{ post.likes.length }}</p>
      </div>
      <!-- FIXME add creator controlled delete with v-if (see gregslist CarDetailsPage) -->
    </div>
  </div>

  <Modal :id="'post-' + post.id">
    <template #modal-title>
      <h4>{{ post.creator.name }}</h4>
    </template>
    <template #modal-body>
      <div class="row cover-image" :style="{ backgroundImage: coverImg }"></div>
      <div class="row justify-content-center">
        <h4>{{ post.body }}</h4>
        <h4 class="text-center my-2">Created By:</h4>
        <PostImg v-for="p in post.postImgs" :key="p.id" :image="p" />
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
        <div class="col-12">
          <button
            class="btn btn-danger"
            v-if="post.creatorId == account.id"
            type="button"
            @click="removePost()"
          >
            Remove Post
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    return {
      async goToProfile() {
        Modal.getOrCreateInstance(
          document.getElementById("post-" + props.post.id)
        ).toggle();
        router.push({
          name: "Profile",
          params: { id: props.post.creatorId },
        });
      },
      coverImg: computed(() => `url('${props.post.creator?.coverImg}')`),
      account: computed(() => AppState.account),

      removePost() {
        try {
          Modal.getOrCreateInstance(
            document.getElementById("post-" + props.post.id)
          ).toggle();
          postsService.removePost(props.post.id);
        } catch (error) {
          logger.log(error.message, "modal vue");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.post-image {
  // background-image: v-bind();
  background-size: cover;
  object-fit: contain;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}
.cover-image {
  // background-image: v-bind(coverImg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 50vh;
}

.creator-image {
  height: 3rem;
  width: 3rem;
}
</style>