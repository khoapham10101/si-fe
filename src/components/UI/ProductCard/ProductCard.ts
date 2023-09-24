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
  @Prop({ default: false }) private isWishlist?: boolean;

  private handleImagePath = handleImagePath;
  private isAddToCardLoading = false;
  private isWishlistLoading = false;

  get isAuthenticated(): boolean {
    return this.$store.getters["auth/authState"].isAuthenticated;
  }

  get pathDetail(): string {
    return `${PATH.Product}/${this.data?.id}`;
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
    }
  }

  private async handleDeleteWishlist() {
    try {
      this.isWishlistLoading = true;
      await WishlistService.deleteWishlist(Number(this.data?.id));
      this.$emit("reloadWishlist");
    } catch (error: any) {
      this.$message({
        message: error.response.data.message,
        type: "error",
      });
    } finally {
      this.isWishlistLoading = false;
    }
  }
}
