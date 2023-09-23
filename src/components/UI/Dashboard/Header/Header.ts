import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "header-dashboard",
  components: {
    //
  },
})
export default class Header extends Vue {
  get breadCrumbItems(): string[] {
    return this.$route.path.split("/").slice(1);
  }

  private mounted() {
    //
  }
}
