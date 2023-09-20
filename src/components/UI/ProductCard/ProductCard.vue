<template>
  <div class="product-card card w-100 shadow-sm h-100" v-if="data">
    <div class="ratio ratio-1x1">
      <router-link :to="pathDetail">
        <img
          :src="data.image"
          class="product-card-image card-img-top w-100 h-100"
          alt=""
        />
      </router-link>
    </div>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title mb-3">
        <router-link :to="pathDetail" class="text-reset text-decoration-none">
          {{ data.title }}
        </router-link>
      </h5>
      <p class="card-text mt-auto mb-3">${{ data.price.toFixed(2) }}</p>

      <div
        class="card-footer d-flex justify-content-end align-items-end pt-3 px-0 pb-0 bg-white"
      >
        <button
          to="#"
          class="add-to-cart-btn btn btn-primary shadow-0 me-1 text-uppercase d-inline-flex justify-content-center align-items-center"
          @click="handleAddToCart()"
        >
          Add to cart
        </button>
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
