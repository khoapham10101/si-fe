import { PATH, accountPath } from "@/constants/path";
import { AuthService } from "@/services/auth";
import { UserProfile } from "@/types/auth";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "dropdown-user",
  components: {
    //
  },
})
export default class DropdownUser extends Vue {
  private PATH = PATH;
  private accountPath = accountPath;

  get isAuthenticated(): boolean {
    return this.$store.getters["auth/authState"].isAuthenticated;
  }

  get profile(): UserProfile {
    return this.$store.getters["auth/authState"].profile;
  }

  private async handleLogout() {
    try {
      this.$store.dispatch("auth/updateIsLogoutLoading", true);
      const { data } = await AuthService.logout();
      if (data.code === 200) {
        this.$store.dispatch("auth/resetAuth");
        localStorage.clear();
        if (this.$route.path !== PATH.Home) {
          this.$router.replace({ path: PATH.Home });
        }
      }
    } catch (error) {
      //
    } finally {
      this.$store.dispatch("auth/updateIsLogoutLoading", false);
    }
  }
}
