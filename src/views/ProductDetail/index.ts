import { Component, Vue } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";
import { PRODUCTS_DUMMY } from "@/dummies/product";
import { Product } from "@/types/product";
import { CartItem } from "@/store/modules/cart";

@Component({
  name: "product-detail-page",
  components: {
    Input,
  },
})
export default class ProductDetailPage extends Vue {
  private quantity = 1;

  get product(): Product | undefined {
    const id = this.$route.params.id;
    return PRODUCTS_DUMMY.find((item) => item.id === +id);
  }

  private increaseQuantity() {
    this.quantity = this.quantity + 1;
  }

  private decreaseQuantity() {
    if (this.quantity === 1) {
      return;
    }
    this.quantity = this.quantity - 1;
  }

  private handleAddToCart() {
    this.$store.dispatch("cart/addToCart", {
      ...this.product,
      total: this.quantity,
    } as CartItem);
  }
}
