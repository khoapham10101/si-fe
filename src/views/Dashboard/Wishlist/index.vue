<template>
  <div class="wish-list-page py-4">
    <div class="container">
      <h2>Wishlist</h2>
      <ProductList
        :data="productList"
        :isLoading="isLoading"
        @reloadWishlist="getWishlists()"
      />
      <el-empty
        description="No data"
        v-if="!productList.length && !isLoading"
      ></el-empty>
      <!-- pagination -->
      <nav class="my-3" v-if="totalPage > 1 && !isLoading">
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
            @click="handlePageChange(page)"
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
