import { MENU_SIDEBAR } from "@/constants/menu";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "sidebar-component",
  components: {
    //
  },
})
export default class Sidebar extends Vue {
  @Prop({ default: false }) isCollapse?: boolean;

  private menuItems = MENU_SIDEBAR.filter((item) => !item.children);
  private menuItemsHasSub = MENU_SIDEBAR.filter((item) => item.children);

  private windowWidth = window.innerWidth;

  private mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  }

  get isMobile(): boolean {
    return this.windowWidth <= 768;
  }

  private beforeDestroy() {
    window.removeEventListener("resize", () => {
      //
    });
  }
}
