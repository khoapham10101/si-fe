<template>
  <div class="product-list row">
    <div
      class="col-lg-3 col-md-6 col-sm-6"
      v-for="product in data"
      :key="product.id"
    >
      <ProductCard :data="product" />
    </div>
  </div>
</template>

<script lang="ts" src="./ProductList.ts"></script>

<style lang="scss" scoped>
@import "./ProductList.scss";
</style>
