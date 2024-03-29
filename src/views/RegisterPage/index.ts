import { Component, Vue } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";
import Select from "@/components/Base/Select/Select.vue";
import { DEFAULT_BIRTHDAY, GENDER_OPTIONS } from "@/constants/common";
import moment from "moment";
import { GenderEnum } from "@/enums/common";
import { RegisterPayload } from "@/services/auth/type";
import { AuthService } from "@/services/auth";
import { PATH } from "@/constants/path";

@Component({
  name: "register-page",
  components: {
    Input,
    Select,
  },
})
export default class RegisterPage extends Vue {
  private genderOptions = GENDER_OPTIONS;
  private isLoading = false;
  private errorMessage = "";

  private form = {
    firstName: {
      value: "",
      blured: false,
      errorMsg: "First name is required",
    },
    lastName: {
      value: "",
      blured: false,
      errorMsg: "Last name is required",
    },
    idCard: {
      value: "",
      blured: false,
      errorMsg: "ID Card min length is 5 characters",
    },
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
    confirmPassword: {
      value: "",
      blured: false,
      errorMsg: "Confirm password is invalid",
    },
    gender: {
      value: GenderEnum.FEMALE,
    },
    birthday: {
      value: DEFAULT_BIRTHDAY,
    },
    valid: false,
  };

  private pickerOptions = {
    disabledDate(date: any) {
      const rangeYearDisable = 12;
      const d = new Date();
      const previous = d.setFullYear(d.getFullYear() - rangeYearDisable);
      return date.getTime() > previous;
    },
  };

  private validEmail(value: string) {
    const regex = /(.+)@(.+){2,}\.(.+){2,}/;
    return regex.test(value.toLowerCase());
  }

  private validPassword(value: string) {
    return value.length >= 8;
  }

  private validConfirmPassword(value: string) {
    return this.validPassword(value) && value === this.form.password.value;
  }

  private validIdCard(value: string) {
    if (value.length < 5) {
      this.form.idCard.errorMsg = "ID Card min length is 5 characters";
      return false;
    }
    const regex = /^[0-9]+$/;
    if (!regex.test(value.toLowerCase())) {
      this.form.idCard.errorMsg = "ID Card is invalid";
      return false;
    }
    return regex.test(value.toLowerCase());
  }

  private validate() {
    if (
      this.validEmail(this.form.email.value) &&
      this.validPassword(this.form.password.value) &&
      this.validConfirmPassword(this.form.confirmPassword.value) &&
      this.validIdCard(this.form.idCard.value)
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
        const payload: RegisterPayload = {
          first_name: this.form.firstName.value,
          last_name: this.form.lastName.value,
          id_card: this.form.idCard.value,
          email: this.form.email.value,
          password: this.form.password.value,
          gender_id: Number(this.form.gender.value),
          birthday: this.form.birthday.value
            ? moment(this.form.birthday.value).format("YYYY-MM-DD")
            : null,
        };

        const { data } = await AuthService.register(payload);
        if (data.code === 200) {
          this.$router.push({
            path: PATH.Login,
          });
        }
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
