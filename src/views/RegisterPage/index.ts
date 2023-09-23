import { Component, Vue } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";
import Select from "@/components/Base/Select/Select.vue";
import { GENDER_OPTIONS } from "@/constants/common";
import moment from "moment";

@Component({
  name: "register-page",
  components: {
    Input,
    Select,
  },
})
export default class RegisterPage extends Vue {
  private genderOptions = GENDER_OPTIONS;

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
      errorMsg: "Id card is required",
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
    gender: {
      value: "0",
    },
    birthday: {
      value: "",
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
      const formData = {
        first_name: this.form.firstName.value,
        last_name: this.form.lastName.value,
        id_card: this.form.idCard.value,
        email: this.form.email.value,
        password: this.form.password.value,
        gender: Number(this.form.gender.value),
        birthday: moment(this.form.birthday.value).format("YYYY-MM-DD"),
      };
      console.log(formData);
    }
  }
}
