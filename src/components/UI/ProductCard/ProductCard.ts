import { Product } from "@/types/product";
import { Component, Prop, Vue } from "vue-property-decorator";
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

  private handleImagePath = handleImagePath;

  get pathDetail(): string {
    return `${PATH.Product}/${this.data?.id}`;
  }

  private handleAddToCart() {
    this.$store.dispatch("cart/addToCart", {
      ...this.data,
      total: 1,
    } as CartItem);
  }
}
