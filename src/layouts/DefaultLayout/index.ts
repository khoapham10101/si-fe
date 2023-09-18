import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/UI/Header/Header.vue";
import Footer from "@/components/UI/Footer/Footer.vue";

@Component({
  name: "default-layout",
  components: {
    Header,
    Footer,
  },
})
export default class DefaultLayout extends Vue {
  //
}
