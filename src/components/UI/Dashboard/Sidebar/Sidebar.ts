import { MENU_SIDEBAR } from "@/constants/menu";
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

  private menuItems = MENU_SIDEBAR;

  private windowWidth = window.innerWidth;

  get defaultActive(): string {
    return this.$route.path;
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
