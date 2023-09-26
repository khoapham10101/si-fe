import {
  MENU_SIDEBAR_ADMIN,
  MENU_SIDEBAR_USER,
  MenuSidebarItem,
} from "@/constants/menu";
import { UserRole } from "@/enums/user";
import { Role } from "@/types/user";

import { Component, Prop, Vue } from "vue-property-decorator";

const MOBILE_SCREEN_WIDTH = 768;

@Component({
  name: "sidebar-component",
  components: {
    //
  },
})
export default class Sidebar extends Vue {
  @Prop({ default: false }) isCollapse?: boolean;

  private windowWidth = window.innerWidth;

  get defaultActive(): string {
    return this.$route.path;
  }

  get menuItems(): MenuSidebarItem[] {
    const roles = this.$store.getters["auth/profile"].roles;
    const isAdmin = roles.some((item: Role) => item.name === UserRole.ADMIN);
    return isAdmin ? MENU_SIDEBAR_ADMIN : MENU_SIDEBAR_USER;
  }

  private mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  }

  get isMobile(): boolean {
    return this.windowWidth <= MOBILE_SCREEN_WIDTH;
  }

  private beforeDestroy() {
    window.removeEventListener("resize", () => {
      //
    });
  }
}
