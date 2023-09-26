<template>
  <header class="header">
    <div class="p-3 text-center bg-white border-bottom">
      <div class="container">
        <div class="row gy-3">
          <div class="col-12 col-md-6">
            <router-link to="/" class="float-start">
              <img src="@/assets/images/shopinvest-logo.png" width="35" />
            </router-link>
          </div>

          <div class="order-lg-last col-12 col-md-6">
            <div class="d-flex gap-1 gap-sm-2 flex-wrap justify-content-end">
              <router-link
                :to="PATH.Login"
                class="btn btn-outline-secondary"
                v-if="!isAuthenticated"
              >
                <i class="fa-solid fa-user"></i>
                <span> Sign in</span>
              </router-link>
              <router-link
                :to="PATH.Account.Wishlist"
                class="btn btn-outline-secondary"
                v-if="isAuthenticated"
              >
                <i class="fa-solid fa-heart"></i>
                <span> Wishlist </span>
              </router-link>
              <button type="button" class="btn btn-outline-secondary">
                <i class="fa-solid fa-cart-shopping"></i>
                <span>
                  My cart
                  <span
                    class="text-danger fw-bolder"
                    v-if="!isLoading && isAuthenticated"
                    >({{ cartTotal }})</span
                  >
                </span>
              </button>
              <DropdownUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" src="./Header.ts"></script>

<style lang="scss" scoped>
@import "./Header.scss";
</style>
