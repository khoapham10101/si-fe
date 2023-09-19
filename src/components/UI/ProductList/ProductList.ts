import { Component, Vue } from "vue-property-decorator";
import { PRODUCTS_DUMMY } from "@/dummies/product";
import ProductCard from "../ProductCard/ProductCard.vue";

@Component({
  name: "product-list-component",
  components: {
    ProductCard,
  },
})
export default class ProductList extends Vue {
  private productList = PRODUCTS_DUMMY;
}
