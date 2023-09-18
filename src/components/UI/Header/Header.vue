<template>
  <header class="header">
    <div class="p-3 text-center bg-white border-bottom">
      <div class="container">
        <div class="row gy-3">
          <div class="col-lg-2 col-sm-4 col-4">
            <router-link to="/" class="float-start">
              <img
                src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
                height="35"
              />
            </router-link>
          </div>

          <div class="col-lg-5 col-md-12 col-12 d-flex">
            <Input placeholder="Search" className="w-100" />
            <button class="btn-search" type="button">Search</button>
          </div>

          <div class="order-lg-last col-lg-5 col-12">
            <div class="d-flex gap-2 flex-wrap justify-content-end">
              <button type="button" class="btn btn-outline-secondary">
                <i class="fa-solid fa-user"></i>
                <span> Sign in</span>
              </button>
              <button type="button" class="btn btn-outline-secondary">
                <i class="fa-solid fa-heart"></i>
                <span> Wishlist </span>
              </button>
              <button type="button" class="btn btn-outline-secondary">
                <i class="fa-solid fa-cart-shopping"></i>
                <span> My cart </span>
              </button>
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
