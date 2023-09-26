import { Component, Vue, Watch } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";
import { PATH } from "@/constants/path";
import { AuthService } from "@/services/auth";
import DropdownUser from "../DropdownUser/DropdownUser.vue";
import { CartService } from "@/services/cart";
import { Role, User } from "@/types/user";
import { UserRole } from "@/enums/user";

@Component({
  name: "header-component",
  components: {
    Input,
    DropdownUser,
  },
})
export default class Header extends Vue {
  private PATH = PATH;
  private isLoading = false;

  get cartTotal(): number {
    return this.$store.getters["cart/cartsTotal"];
  }

  get isAuthenticated(): boolean {
    return this.$store.getters["auth/authState"].isAuthenticated;
  }

  get profile(): User {
    return this.$store.getters["auth/authState"].profile;
  }

  @Watch("isAuthenticated", { immediate: true })
  private isAuthenticatedChange() {
    if (this.isAuthenticated) {
      this.getCartsList();
    }
  }

  private mounted() {
    //
  }

  private errorImage(e: any) {
    e.target.src = "@/assets/images/avatar_default.jpeg";
  }

  private async getCartsList() {
    try {
      this.isLoading = true;
      const { data } = await CartService.getListCarts();
      this.$store.dispatch("cart/updateCarts", data);
    } catch (error) {
      //
    } finally {
      this.isLoading = false;
    }
  }

  private async handleLogout() {
    try {
      const { data } = await AuthService.logout();
      if (data.code === 200) {
        this.$store.dispatch("auth/resetAuth");
        localStorage.clear();
      }
    } catch (error) {
      //
    }
  }
}
