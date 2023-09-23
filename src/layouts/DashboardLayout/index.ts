import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/UI/Dashboard/Header/Header.vue";
import Sidebar from "@/components/UI/Dashboard/Sidebar/Sidebar.vue";

@Component({
  name: "dashboard-layout",
  components: {
    Header,
    Sidebar,
  },
})
export default class DashboardLayout extends Vue {
  private collapseSidebar = false; // pc
  private openSidebar = false; // mobile

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

  private handleCollapseSidebar() {
    if (!this.isMobile) {
      this.collapseSidebar = !this.collapseSidebar;
    } else {
      this.collapseSidebar = false;
      this.openSidebar = !this.openSidebar;
    }
  }
}
