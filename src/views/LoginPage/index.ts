import { Component, Vue } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";

@Component({
  name: "login-page",
  components: {
    Input,
  },
})
export default class LoginPage extends Vue {
  private form = {
    email: {
      value: "",
      blured: false,
      errorMsg: "Email is invalid",
    },
    password: {
      value: "",
      blured: false,
      errorMsg: "Password is invalid",
    },
    valid: false,
  };

  private validEmail(value: string) {
    const regex = /(.+)@(.+){2,}\.(.+){2,}/;
    return regex.test(value.toLowerCase());
  }

  private validPassword(value: string) {
    return value.length > 5;
  }

  private validate() {
    // this.form.email.blured = true;
    // this.form.password.blured = true;
    if (
      this.validEmail(this.form.email.value) &&
      this.validPassword(this.form.password.value)
    ) {
      this.form.valid = true;
    }
  }

  private submit() {
    this.validate();
    if (this.form.valid) {
      // console.log(this.form);
      const formData = {
        email: this.form.email.value,
        password: this.form.password.value,
      };
      console.log(formData);
    }
  }
}
