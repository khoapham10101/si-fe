import { Component, Vue } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";
import ProductCard from "@/components/UI/ProductCard/ProductCard.vue";
import ProductList from "@/components/UI/ProductList/ProductList.vue";

@Component({
  name: "home-page",
  components: {
    Input,
    ProductCard,
    ProductList,
  },
})
export default class HomePage extends Vue {
  //
}
