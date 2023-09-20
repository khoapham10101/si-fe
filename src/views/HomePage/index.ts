import { Component, Vue, Watch } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";
import ProductCard from "@/components/UI/ProductCard/ProductCard.vue";
import ProductList from "@/components/UI/ProductList/ProductList.vue";
import { PRODUCTS_DUMMY } from "@/dummies/product";

@Component({
  name: "home-page",
  components: {
    Input,
    ProductCard,
    ProductList,
  },
})
export default class HomePage extends Vue {
  private productList = PRODUCTS_DUMMY;

  @Watch("$route", { deep: true })
  private keywordChange(value: any) {
    const keyword = value.query.keyword;
    if (!keyword) {
      this.productList = PRODUCTS_DUMMY;
      return;
    }
    this.productList = PRODUCTS_DUMMY.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}
