import { Product } from "@/types/product";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "product-card-component",
  components: {
    //
  },
})
export default class ProductCard extends Vue {
  @Prop({ default: null }) private data!: Product | null;
}
