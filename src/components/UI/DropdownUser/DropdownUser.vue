<template>
  <div class="dropdown dropdown-user mx-2" v-if="isAuthenticated">
    <div
      id="dropdownUser"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      class="d-flex gap-1 align-items-center"
      style="cursor: pointer"
    >
      <img
        v-if="profile.avatar"
        :src="profile.avatar"
        class="img-fluid"
        alt="avatar"
      />
      <img
        src="@/assets/images/avatar_default.jpeg"
        class="img-fluid"
        alt="avatar"
        v-else
      />
      <i class="fa-solid fa-chevron-down"></i>
    </div>

    <ul class="dropdown-menu" aria-labelledby="dropdownUser">
      <li v-if="!$route.path.includes(accountPath)">
        <router-link
          class="dropdown-item"
          type="button"
          :to="PATH.Account.Product"
        >
          <span class="text-secondary">
            <i class="fa-solid fa-id-card mx-2"></i>
            Account
          </span>
        </router-link>
      </li>
      <li>
        <button class="dropdown-item" type="button" @click="handleLogout()">
          <span class="text-secondary">
            <i class="fa-solid fa-arrow-right-from-bracket mx-2"></i>
            Logout
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./DropdownUser.ts"></script>

<style lang="scss" scoped>
@import "./DropdownUser.scss";
</style>
