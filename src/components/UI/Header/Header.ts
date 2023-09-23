import { Component, Vue } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";
import { PATH } from "@/constants/path";

@Component({
  name: "header-component",
  components: {
    Input,
  },
})
export default class Header extends Vue {
  private keyword = "";
  private PATH = PATH;

  get cartTotal(): number {
    return this.$store.getters["cart/carts"].total;
  }

  private mounted() {
    if (this.$route.query.keyword) {
      this.keyword = (this.$route.query.keyword as string) || "";
    }
  }

  private handleSubmit() {
    if (this.keyword) {
      this.$router
        .replace({ path: PATH.Home, query: { keyword: this.keyword } })
        .catch((error) => {
          //
        });
    } else {
      this.$router.push({ path: PATH.Home, query: {} }).catch((error) => {
        //
      });
    }
  }
}
