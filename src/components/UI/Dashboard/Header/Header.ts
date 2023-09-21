import { Component, Vue } from "vue-property-decorator";
import DropdownUser from "../../DropdownUser/DropdownUser.vue";
import { UserProfile } from "@/types/auth";

@Component({
  name: "header-dashboard",
  components: {
    DropdownUser,
  },
})
export default class Header extends Vue {
  get breadCrumbItems(): string[] {
    return this.$route.path.split("/").slice(1);
  }

  get profile(): UserProfile {
    return this.$store.getters["auth/authState"].profile;
  }
  private mounted() {
    //
  }
}
