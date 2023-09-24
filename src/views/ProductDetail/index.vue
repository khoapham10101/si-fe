<template>
  <div class="product-detail-page">
    <!-- breadcrumb -->
    <nav
      class="breadcrumb-wrap"
      style="
        --bs-breadcrumb-divider: url(
          &#34;data:image/svg + xml,
          %3Csvgxmlns='http://www.w3.org/2000/svg'width='8'height='8'%3E%3Cpathd='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z'fill='currentColor'/%3E%3C/svg%3E&#34;
        );
      "
      aria-label="breadcrumb"
    >
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item text-reset">Home</li>
          <i class="fa-solid fa-chevron-right" style="font-size: 10px"></i>
          <li class="breadcrumb-item active" aria-current="page">
            Product detail
          </li>
        </ol>
      </div>
    </nav>
    <!--  -->

    <div style="min-height: 500px" v-loading="isLoading" v-if="isLoading"></div>
    <div class="container py-5" v-else>
      <div class="row g-2 g-sm-5">
        <div class="col-12 col-md-5">
          <div class="card w-100">
            <div class="card-body">
              <div class="w-100 ratio ratio-1x1">
                <img
                  :src="handleImagePath(activeImage)"
                  class="w-100 h-100"
                  style="object-fit: contain"
                  alt=""
                />
              </div>
            </div>
          </div>

          <!-- swiper -->
          <swiper
            class="swiper mt-3"
            :options="swiperOption"
            ref="mySwiper"
            v-if="!isLoading"
          >
            <swiper-slide
              v-for="(item, index) in product?.images"
              :key="index"
              @click.native="swiperItemClick(item.path)"
            >
              <div :class="['h-100', { active: item.path === activeImage }]">
                <img
                  :src="handleImagePath(item.path)"
                  class="image-item w-100 h-100"
                  alt=""
                />
              </div>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
            <div
              class="swiper-button-prev"
              slot="button-prev"
              @click="$refs.mySwiper.swiper.slidePrev()"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </div>
            <div
              class="swiper-button-next"
              slot="button-next"
              @click="$refs.mySwiper.swiper.slideNext()"
            >
              <i class="fa-solid fa-chevron-right"></i>
            </div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
          </swiper>
          <!--  -->
        </div>

        <div class="col-12 col-md-7">
          <h3>{{ product?.name }}</h3>

          <div class="text-secondary fs-3 mt-3">
            {{ product?.price?.toFixed(2) }}$
          </div>
          <div class="d-flex align-items-center mt-2">
            <div style="width: 120px">Brand</div>
            <div class="text-secondary">{{ product.brand.name }}</div>
          </div>

          <div class="mt-3" style="height: 250px">
            <el-tabs type="card" @tab-click="handleClickTab">
              <el-tab-pane label="Description">
                {{ product?.description }}
              </el-tab-pane>
              <el-tab-pane label="Delivery"> Delivery </el-tab-pane>
              <el-tab-pane label="Warranty">
                {{ product?.warranty_information }}
              </el-tab-pane>
            </el-tabs>
          </div>

          <div
            class="my-4 w-100"
            style="height: 1px; background-color: #ccc"
          ></div>

          <div>
            <label for="quantity">Quantity</label>
            <div class="d-flex mt-2">
              <button
                type="button"
                class="btn-quantity rounded-0"
                @click="decreaseQuantity()"
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                class="form-control rounded-0"
                style="width: 100px"
                min="1"
                v-model.number="quantity"
              />
              <button
                type="button"
                class="btn-quantity rounded-0"
                @click="increaseQuantity()"
              >
                +
              </button>
            </div>
          </div>

          <div class="d-flex mt-4 gap-2">
            <button
              to="#"
              class="add-to-cart-btn btn btn-primary shadow-0 me-1 text-uppercase d-inline-flex justify-content-center align-items-center gap-2"
              @click="handleAddToCart()"
            >
              <i class="fa-solid fa-cart-shopping"></i>
              <span> Add to cart </span>
            </button>
            <button
              class="add-wishlist btn btn-light border icon-hover d-inline-flex justify-content-center align-items-center"
              @click="handleCreateWishList()"
            >
              <i class="fas fa-heart fa-lg text-secondary"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
