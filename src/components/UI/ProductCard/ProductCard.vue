<template>
  <div class="product-card card w-100 my-2 shadow-sm" v-if="data">
    <div class="ratio ratio-1x1">
      <img
        :src="data.image"
        class="product-card-image card-img-top w-100 h-100"
        alt=""
      />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ data.title }}</h5>
      <p class="card-text">${{ data.price.toFixed(2) }}</p>

      <div
        class="card-footer d-flex justify-content-end align-items-end pt-3 px-0 pb-0 mt-auto bg-white"
      >
        <router-link
          to="#"
          class="add-to-card btn btn-primary shadow-0 me-1 text-uppercase d-inline-flex justify-content-center align-items-center"
        >
          Add to cart
        </router-link>
        <button
          class="add-wishlist btn btn-light border icon-hover d-inline-flex justify-content-center align-items-center"
        >
          <i class="fas fa-heart fa-lg text-secondary"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ProductCard.ts"></script>

<style lang="scss" scoped>
@import "./ProductCard.scss";
</style>
