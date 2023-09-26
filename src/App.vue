<template>
  <div
    id="app"
    :class="{ loading: isLogoutLoading }"
    v-loading="isLogoutLoading"
  >
    <component :is="layout">
      <router-view :layout.sync="layout" />
    </component>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import DefaultLayout from "@/layouts/DefaultLayout/index.vue";
import BlankLayout from "@/layouts/BlankLayout/index.vue";
import DashboardLayout from "@/layouts/DashboardLayout/index.vue";
import { DEFAULT_LAYOUT } from "./constants/common";
import { WishlistService } from "./services/wishlist";

@Component({
  components: { DefaultLayout, BlankLayout, DashboardLayout },
})
export default class App extends Vue {
  private layout: string | null = null;
  private isWishlistLoading = false;

  get isLogoutLoading(): boolean {
    return this.$store.getters["auth/isLogoutLoading"];
  }

  get isAuthenticated(): boolean {
    return this.$store.getters["auth/isAuthenticated"];
  }

  @Watch("isAuthenticated", { deep: true, immediate: true })
  private async isAuthenticatedChange() {
    if (!this.isAuthenticated) {
      this.$store.dispatch("product/updateProductsWishlist", null);
      return;
    }
    try {
      this.$store.dispatch("product/updateIsWishListLoading", true);
      const { data } = await WishlistService.getWishlists({
        per_page: 100,
        current_page: 1,
      });
      const productsWishlist = data.map((item) => item.product);
      this.$store.dispatch("product/updateProductsWishlist", productsWishlist);
    } catch (error) {
      //
    } finally {
      this.$store.dispatch("product/updateIsWishListLoading", false);
    }
  }

  private created() {
    const access_token = localStorage.getItem("token");
    const profile = localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile") as string)
      : null;
    if (access_token && profile) {
      this.$store.dispatch("auth/updateAuth", {
        access_token,
        profile,
        isAuthenticated: true,
      });
    } else {
      this.$store.dispatch("auth/resetAuth");
    }

    //
    if (this.$route.meta?.layout !== undefined) {
      this.layout = this.$route.meta.layout;
    } else {
      this.layout = DEFAULT_LAYOUT;
    }
  }

  @Watch("$route")
  private onChangeRouter(val: any) {
    window.scrollTo({
      top: 0,
    });

    if (val.meta.layout !== undefined) {
      this.layout = val.meta.layout;
    } else {
      this.layout = DEFAULT_LAYOUT;
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/_main";

.loading {
  height: 100vh;
  overflow: hidden;
}
</style>
