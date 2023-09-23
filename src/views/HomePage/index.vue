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
      <ProductList :data="productList" :isLoading="isProductLoading" />
      <el-empty
        description="No data"
        v-if="!productList.length && !isProductLoading"
      ></el-empty>
      <!-- pagination -->
      <nav class="my-3" v-if="totalPage > 1 && !isProductLoading">
        <ul
          class="pagination w-full d-flex justify-content-center align-items-center"
        >
          <li
            :class="['page-item page-link', { disabled: currentPage === 1 }]"
            @click="handlePrev()"
            style="cursor: pointer"
          >
            <span aria-hidden="true">&laquo;</span>
          </li>
          <li
            :class="['page-item page-link', { active: currentPage === page }]"
            v-for="page in totalPage"
            :key="page"
            style="cursor: pointer"
            @click="handleChangePage(page)"
          >
            {{ page }}
          </li>
          <li
            :class="[
              'page-item page-link',
              { disabled: currentPage === totalPage },
            ]"
            @click="handleNext()"
            style="cursor: pointer"
          >
            <span aria-hidden="true">&raquo;</span>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
