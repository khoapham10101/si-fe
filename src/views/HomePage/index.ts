import { Component, Vue, Watch } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";
import ProductCard from "@/components/UI/ProductCard/ProductCard.vue";
import ProductList from "@/components/UI/ProductList/ProductList.vue";
import { PRODUCTS_DUMMY } from "@/dummies/product";
import { ProductService } from "@/services/product";
import { Product } from "@/types/product";
import { PATH } from "@/constants/path";
import { WishlistService } from "@/services/wishlist";

@Component({
  name: "home-page",
  components: {
    Input,
    ProductCard,
    ProductList,
  },
})
export default class HomePage extends Vue {
  //private productList = PRODUCTS_DUMMY;
  private productList = [] as Product[];
  private totalPage = 1;
  private currentPage = Number(this.$route.query.page) || 1;
  private isProductLoading = false;
  private isCreateWishlistLoading = false;

  @Watch("$route", { deep: true })
  private routeChange(value: any) {
    // const keyword = value.query.keyword;
    // if (!keyword) {
    //   this.productList = PRODUCTS_DUMMY;
    //   return;
    // }
    // this.productList = PRODUCTS_DUMMY.filter((item) =>
    //   item.title.toLowerCase().includes(keyword.toLowerCase())
    // );
    this.getProducts();
  }

  private mounted() {
    this.getProducts();
  }

  private async getProducts() {
    const perPage = 12;
    try {
      this.isProductLoading = true;
      const { data, meta } = await ProductService.getPublicProducts({
        per_page: perPage,
        current_page: this.currentPage,
      });
      this.productList = data;
      this.totalPage = meta.last_page;
    } catch (error) {
      //
    } finally {
      this.isProductLoading = false;
    }
  }

  private handleChangePage(page: number) {
    this.currentPage = page;
    this.$router
      .replace({ path: PATH.Home, query: { page: page.toString() } })
      .catch((error) => {
        //
      });
  }

  private handleNext() {
    if (this.currentPage === this.totalPage) {
      return;
    }
    this.handleChangePage(this.currentPage + 1);
  }

  private handlePrev() {
    if (this.currentPage === 1) {
      return;
    }
    this.handleChangePage(this.currentPage - 1);
  }

  private async handleCreateWishList(id: number) {
    try {
      this.isCreateWishlistLoading = true;
      await WishlistService.createWishlist(id);
      this.$message({
        message: "Create wishlist successfully",
        type: "success",
      });
    } catch (error: any) {
      this.$message({
        message: error.response.data.message,
        type: "error",
      });
    } finally {
      this.isCreateWishlistLoading = false;
    }
  }
}
