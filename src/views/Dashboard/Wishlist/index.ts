import { PATH } from "@/constants/path";
import { WishlistService } from "@/services/wishlist";
import { Wishlist } from "@/types/wishlist";
import { Component, Vue, Watch } from "vue-property-decorator";
import ProductList from "@/components/UI/ProductList/ProductList.vue";
import { Product } from "@/types/product";

@Component({
  name: "wishlist-page",
  components: {
    ProductList,
  },
})
export default class WishListPage extends Vue {
  private isLoading = false;

  private wishlistData = [] as Wishlist[];
  private totalPage = 1;
  private currentPage = Number(this.$route.query.page) || 1;

  get productList(): Product[] {
    return this.wishlistData.map((item) => item.product);
  }

  @Watch("$route", { deep: true })
  private routeChange(value: any) {
    this.getWishlists();
  }

  private mounted() {
    this.getWishlists();
  }

  private async getWishlists() {
    const perPage = 12;
    try {
      this.isLoading = true;
      const { data, meta } = await WishlistService.getWishlists({
        per_page: perPage,
        current_page: this.currentPage,
      });
      this.wishlistData = data;
      this.totalPage = meta.last_page;
    } catch (error) {
      //
    } finally {
      this.isLoading = false;
    }
  }

  private handlePageChange(page: number) {
    this.currentPage = page;
    this.$router
      .replace({
        path: PATH.Account.Wishlist,
        query: { page: page.toString() },
      })
      .catch((error) => {
        //
      });
  }

  private handleNext() {
    if (this.currentPage === this.totalPage) {
      return;
    }
    this.handlePageChange(this.currentPage + 1);
  }

  private handlePrev() {
    if (this.currentPage === 1) {
      return;
    }
    this.handlePageChange(this.currentPage - 1);
  }

  private async handleDeleteWishlist(id: number) {
    try {
      this.isLoading = true;
      await WishlistService.deleteWishlist(id);
      this.getWishlists();
    } catch (error) {
      //
    }
  }
}
