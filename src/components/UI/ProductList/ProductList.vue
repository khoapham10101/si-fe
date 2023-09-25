<template>
  <div class="product-list row">
    <div
      class="col-lg-3 col-md-6 col-sm-6"
      v-for="(product, index) in listData"
      :key="index"
    >
      <div class="my-3">
        <ProductCard
          :data="product"
          :isWishlist="isWishlist"
          @deleteWishlist="deleteWishlist"
          @createWishlist="createWishlist"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ProductList.ts"></script>

<style lang="scss" scoped>
@import "./ProductList.scss";
</style>
