import { Component, Vue } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";

@Component({
  name: "header-component",
  components: {
    Input,
  },
})
export default class Header extends Vue {
  //
}
