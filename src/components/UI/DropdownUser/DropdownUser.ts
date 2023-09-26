import { PATH, accountPath } from "@/constants/path";
import { UserRole } from "@/enums/user";
import { AuthService } from "@/services/auth";
import { Role, User } from "@/types/user";
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

  get profile(): User {
    return this.$store.getters["auth/authState"].profile;
  }

  // get isAdmin(): boolean {
  //   const roles = this.$store.getters["auth/profile"].roles;
  //   return roles.some((item: Role) => item.name === UserRole.ADMIN);
  // }

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
