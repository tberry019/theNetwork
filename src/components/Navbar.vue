<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img
          alt="logo"
          src="data:image/jpeg;base64,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"
          height="45"
        />
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <router-link :to="{ name: 'Account', params: { id: id } }">
          <div class="btn text-success lighten-30 selectable text-uppercase">
            My Profile
          </div>
        </router-link>
      </ul>
      <span class="navbar-text">
        <button
          class="
            btn
            selectable
            text-success
            lighten-30
            text-uppercase
            my-2 my-lg-0
          "
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown my-2 my-lg-0" v-else>
          <div
            class="dropdown-toggle selectable"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="authDropdown"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3 text-success lighten-30">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            aria-labelledby="authDropdown"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Manage Account
              </div>
            </router-link>
            <div
              class="
                list-group-item list-group-item-action
                hoverable
                text-danger
              "
              @click="logout"
            >
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from "../services/AuthService";
import { AppState } from "../AppState";
import { computed } from "vue";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
