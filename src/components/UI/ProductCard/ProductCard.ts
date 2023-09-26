import { Product } from "@/types/product";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PATH } from "@/constants/path";
import { handleImagePath } from "@/helpers/handleImagePath";
import { CartService } from "@/services/cart";
import { WishlistService } from "@/services/wishlist";

@Component({
  name: "product-card-component",
  components: {
    //
  },
})
export default class ProductCard extends Vue {
  @Prop({ default: null }) private data!: Product | null;

  private handleImagePath = handleImagePath;
  private isAddToCardLoading = false;
  private isWishlistLoading = false;
  // private isWishList = false;

  get isAuthenticated(): boolean {
    return this.$store.getters["auth/authState"].isAuthenticated;
  }

  get pathDetail(): string {
    return `${PATH.Product}/${this.data?.id}`;
  }

  get productsWishlist(): Product[] | null {
    return this.$store.getters["product/productsWishlist"];
  }

  get isWishlist(): boolean {
    return (
      this.productsWishlist?.some((item) => item.id === this.data?.id) || false
    );
  }

  private async handleAddToCart() {
    if (!this.isAuthenticated) {
      this.$router.push({
        path: PATH.Login,
      });
      return;
    }
    try {
      this.isAddToCardLoading = true;
      await CartService.createCart({ product_id: Number(this.data?.id) });
      const { data } = await CartService.getListCarts();
      this.$store.dispatch("cart/updateCarts", data);
      this.$message({
        message: "Added to cart this product successfully",
        type: "success",
      });
    } catch (error) {
      //
    } finally {
      this.isAddToCardLoading = false;
    }
  }

  private handleWishlist() {
    if (!this.isAuthenticated) {
      this.$router.push({
        path: PATH.Login,
      });
      return;
    }

    if (this.isWishlist) {
      this.handleDeleteWishlist();
    } else {
      this.handleCreateWishList();
    }
  }

  private async handleCreateWishList() {
    try {
      this.isWishlistLoading = true;
      await WishlistService.createWishlist(Number(this.data?.id));
      this.$store.dispatch("product/updateIsWishListLoading", true);
      const { data } = await WishlistService.getWishlists({
        per_page: 100,
        current_page: 1,
      });
      const productsWishlist = data.map((item) => item.product);
      this.$store.dispatch("product/updateProductsWishlist", productsWishlist);
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
      this.isWishlistLoading = false;
      this.$store.dispatch("product/updateIsWishListLoading", false);
    }
  }

  private async handleDeleteWishlist() {
    try {
      this.isWishlistLoading = true;
      await WishlistService.deleteWishlist(Number(this.data?.id));

      this.$store.dispatch("product/updateIsWishListLoading", true);
      const { data } = await WishlistService.getWishlists({
        per_page: 100,
        current_page: 1,
      });
      const productsWishlist = data.map((item) => item.product);
      this.$store.dispatch("product/updateProductsWishlist", productsWishlist);
      this.$message({
        message: "Delete wishlist successfully",
        type: "success",
      });
      this.$emit("reloadWishlist");
    } catch (error: any) {
      this.$message({
        message: error.response.data.message,
        type: "error",
      });
    } finally {
      this.isWishlistLoading = false;
      this.$store.dispatch("product/updateIsWishListLoading", false);
    }
  }
}
