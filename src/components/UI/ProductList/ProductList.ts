import { Component, Prop, Vue } from "vue-property-decorator";
import ProductCard from "../ProductCard/ProductCard.vue";
import { Product } from "@/types/product";

@Component({
  name: "product-list-component",
  components: {
    ProductCard,
  },
})
export default class ProductList extends Vue {
  @Prop({ default: [] }) private data!: Product[];
  @Prop({ default: false }) private isLoading?: boolean;
  @Prop({ default: false }) private isWishlist?: boolean;

  get listData(): Product[] | null[] {
    return !this.isLoading
      ? this.data
      : Array.from({ length: 4 }).map((_, index) => null);
  }

  private reloadWishlist() {
    this.$emit("reloadWishlist");
  }
}
