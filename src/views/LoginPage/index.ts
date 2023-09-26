import { Component, Vue } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";
import { LoginPayload } from "@/services/auth/type";
import { AuthService } from "@/services/auth";
import { AuthState } from "@/store/modules/auth";
import { PATH } from "@/constants/path";
import store from "@/store";
import { UserService } from "@/services/user";

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
  private isLoading = false;
  private errorMessage = "";

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

  private async submit() {
    this.validate();
    if (this.form.valid) {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const payload: LoginPayload = {
          email: this.form.email.value,
          password: this.form.password.value,
        };

        const { data } = await AuthService.login(payload);

        if (data.code === 200) {
          const { access_token, user } = data.data;
          localStorage.setItem("token", access_token);
          const profile = await UserService.getUserDetail(user.id);
          localStorage.setItem("profile", JSON.stringify(profile));
          this.$store.dispatch("auth/updateAuth", {
            access_token,
            profile,
            isAuthenticated: true,
          } as AuthState);
          this.$router.replace({ path: PATH.Home });
        }
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
