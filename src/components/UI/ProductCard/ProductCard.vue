<template>
  <el-skeleton :loading="!data" animated>
    <!-- loading -->
    <template slot="template">
      <el-skeleton-item
        variant="rect"
        style="aspect-ratio: 1/1; border: none"
        class="product-card card"
      >
      </el-skeleton-item>

      <el-skeleton-item variant="h3" style="width: 50%" class="mt-3" />
      <div style="margin-top: 16px; height: 16px">
        <el-skeleton-item variant="text" />
      </div>
      <div class="my-3 d-flex justify-content-end gap-2">
        <el-skeleton-item variant="button" />
        <el-skeleton-item variant="button" />
      </div>
    </template>
    <!--  -->
    <template v-if="data">
      <div class="product-card card w-100 shadow-sm h-100">
        <div class="ratio ratio-1x1">
          <router-link :to="pathDetail">
            <img
              :src="handleImagePath(data.images[0]?.path)"
              class="product-card-image card-img-top w-100 h-100"
              alt=""
              v-if="data.images.length > 0"
            />
            <img
              src="@/assets/images/product-image-default.png"
              class="product-card-image card-img-top w-100 h-100"
              alt=""
              v-else
            />
          </router-link>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title mb-3">
            <router-link
              :to="pathDetail"
              class="text-reset text-decoration-none"
            >
              {{ data.name }}
            </router-link>
          </h5>
          <p class="card-text mt-auto mb-3">${{ data.price.toFixed(2) }}</p>

          <div
            class="card-footer d-flex justify-content-end align-items-end pt-3 px-0 pb-0 bg-white"
          >
            <button
              class="add-to-cart-btn btn btn-primary shadow-0 me-1 text-uppercase d-inline-flex justify-content-center align-items-center gap-2"
              @click="handleAddToCart()"
              :disabled="isAddToCardLoading"
            >
              <span
                class="spinner-border text-light"
                role="status"
                style="width: 20px; height: 20px"
                v-show="isAddToCardLoading"
              ></span>
              <span v-show="!isAddToCardLoading">
                <i class="fa-solid fa-cart-shopping"></i>
              </span>

              <span class="add-to-cart-text"> Add to cart </span>
            </button>

            <button
              class="add-wishlist btn btn-light border icon-hover d-inline-flex justify-content-center align-items-center"
              @click="handleWishlist()"
              :disabled="isWishlistLoading"
            >
              <span
                class="spinner-border text-secondary"
                role="status"
                style="width: 14px; height: 14px"
                v-show="isWishlistLoading"
              ></span>
              <span v-show="!isWishlistLoading">
                <i
                  :class="[
                    'fas fa-heart fa-lg text-secondary',
                    { 'text-danger': isWishlist },
                  ]"
                ></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script lang="ts" src="./ProductCard.ts"></script>

<style lang="scss" scoped>
@import "./ProductCard.scss";
</style>
