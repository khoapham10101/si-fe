import { Component, Vue } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";
import { PATH } from "@/constants/path";
import { AuthService } from "@/services/auth";
import { UserProfile } from "@/types/auth";
import DropdownUser from "../DropdownUser/DropdownUser.vue";

@Component({
  name: "header-component",
  components: {
    Input,
    DropdownUser,
  },
})
export default class Header extends Vue {
  private PATH = PATH;

  get cartTotal(): number {
    return this.$store.getters["cart/carts"].total;
  }

  get isAuthenticated(): boolean {
    return this.$store.getters["auth/authState"].isAuthenticated;
  }

  get profile(): UserProfile {
    return this.$store.getters["auth/authState"].profile;
  }

  private errorImage(e: any) {
    e.target.src = "@/assets/images/avatar_default.jpeg";
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
