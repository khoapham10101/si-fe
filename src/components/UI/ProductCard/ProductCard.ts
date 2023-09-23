import { Product } from "@/types/product";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PATH } from "@/constants/path";
import { CartItem } from "@/store/modules/cart";
import { handleImagePath } from "@/helpers/handleImagePath";

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

  get isAuthenticated(): boolean {
    return this.$store.getters["auth/authState"].isAuthenticated;
  }

  get pathDetail(): string {
    return `${PATH.Product}/${this.data?.id}`;
  }

  private handleAddToCart() {
    this.$store.dispatch("cart/addToCart", {
      ...this.data,
      total: 1,
    } as CartItem);
  }

  private handleWishlist() {
    if (this.isWishlist) {
      this.$emit("deleteWishlist", this.data?.id);
    } else {
      if (!this.isAuthenticated) {
        this.$router.push({
          path: PATH.Login,
        });
        return;
      }
      this.$emit("createWishlist", this.data?.id);
    }
  }
}
