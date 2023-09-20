<template>
  <div class="home-page">
    <div class="text-white py-5" style="background-color: #3b71ca">
      <div class="container py-5">
        <h1>
          Best products &amp; <br />
          brands in our store
        </h1>
        <p>Trendy Products, Factory Prices, Excellent Service</p>
        <div class="d-flex g-2">
          <button type="button" class="learn-more-btn">Learn more</button>
          <button type="button" class="purchase-btn">
            <span>Purchase now</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <h3>New products</h3>
      <ProductList :data="productList" />
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
