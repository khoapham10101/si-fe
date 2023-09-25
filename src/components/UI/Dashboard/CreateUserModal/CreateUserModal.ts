import { SelectOption } from "@/components/Base/Select/Select";
import { ProductService } from "@/services/product";
import { CreateProductPayload } from "@/services/product/type";
import { Brand, Product, ProductImage } from "@/types/product";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { handleImagePath } from "@/helpers/handleImagePath";
import { DEFAULT_BIRTHDAY, GENDER_OPTIONS } from "@/constants/common";
import { GenderEnum } from "@/enums/common";
import { UserStatus } from "@/types/auth";
import { CreateUserPayload, EditUserPayload } from "@/services/user/type";
import { UserService } from "@/services/user";
import moment from "moment";
import { User } from "@/types/user";

@Component({
  name: "create-product-modal",
  components: {
    //
  },
})
export default class CreateUserModal extends Vue {
  @Prop({ default: false }) private visible!: boolean;
  @Prop({ default: undefined }) private dataEdit?: User;

  private handleImagePath = handleImagePath;
  private title = "Create New User";

  private form = {
    email: "",
    firstName: "",
    lastName: "",
    idCard: "",
    birthday: DEFAULT_BIRTHDAY,
    gender: GenderEnum.MALE.toString(),
    id_1: "",
    id_2: "",
    phone: "",
    address: "",
    userStatusId: "",
    password: "",
    confirmPassword: "",
  };

  private validateConfirmPassword = (
    rule?: any,
    value?: string,
    callback?: any
  ) => {
    if (value !== this.form.password) {
      callback(new Error("Confirm password is invalid"));
    } else {
      callback();
    }
  };

  private rules = {
    email: [
      {
        required: true,
        message: "Please input email",
        trigger: "blur",
      },
      {
        require: true,
        pattern: /^\S+@\S+\.\S+$/,
        message: "Email is invalid",
        trigger: "blur",
      },
    ],
    firstName: [
      {
        required: true,
        message: "Please input first name",
        trigger: "blur",
      },
    ],
    lastName: [
      {
        required: true,
        message: "Please input last name",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "Please input password",
        trigger: "blur",
      },
      {
        min: 8,
        message: "Password min length is 8 characters",
      },
    ],
    confirmPassword: [
      {
        required: true,
        message: "Please input confirm password",
        trigger: "blur",
      },
      {
        validator: this.validateConfirmPassword,
        trigger: "change",
      },
    ],
    idCard: [
      {
        required: true,
        message: "Please input id card",
        trigger: "blur",
      },
      {
        min: 5,
        message: "ID Card min length is 5 characters",
      },
      {
        pattern: /^[0-9]+$/,
        message: "ID Card is invalid",
        trigger: "blur",
      },
    ],
    phone: [
      {
        required: true,
        message: "Please input phone number",
        trigger: "blur",
      },
      {
        pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        message: "Phone number is invalid",
      },
    ],
    userStatusId: [
      {
        required: true,
        message: "Please select user status",
        trigger: "change",
      },
    ],
  };

  private isLoading = false;
  private errorMsg = "";

  private pickerOptions = {
    disabledDate(date: any) {
      const rangeYearDisable = 12;
      const d = new Date();
      const previous = d.setFullYear(d.getFullYear() - rangeYearDisable);
      return date.getTime() > previous;
    },
  };

  get genderOptions(): SelectOption[] {
    return GENDER_OPTIONS;
  }

  @Watch("visible")
  private visibleChange() {
    this.resetForm("create-user-form");
    if (this.dataEdit) {
      this.title = "Edit User";
      (this.form.firstName = this.dataEdit.first_name),
        (this.form.lastName = this.dataEdit.last_name),
        (this.form.email = this.dataEdit.email),
        (this.form.idCard = this.dataEdit.id_card),
        (this.form.phone = this.dataEdit.phone || "");
      this.form.userStatusId = this.dataEdit.user_status_id.toString();
      this.form.birthday = this.dataEdit.birthday;
      (this.form.gender = this.dataEdit.gender_id
        ? this.dataEdit.gender_id.toString()
        : ""),
        (this.form.id_1 = this.dataEdit.id_1 || ""),
        (this.form.id_2 = this.dataEdit.id_2 || ""),
        (this.form.address = this.dataEdit.address || "");
    } else {
      this.title = "Create New User";
      (this.form.firstName = ""),
        (this.form.lastName = ""),
        (this.form.email = ""),
        (this.form.idCard = ""),
        (this.form.phone = ""),
        (this.form.userStatusId = ""),
        (this.form.birthday = DEFAULT_BIRTHDAY),
        (this.form.gender = ""),
        (this.form.id_1 = ""),
        (this.form.id_2 = ""),
        (this.form.address = "");
    }
  }

  get listUserStatus(): UserStatus[] | null {
    return this.$store.getters["user/listUserStatus"];
  }

  get listUserStatusOption(): SelectOption[] {
    if (!this.listUserStatus) {
      return [] as SelectOption[];
    }
    return this.listUserStatus?.map((item) => {
      return {
        label: item.name,
        value: item.id.toString(),
      } as SelectOption;
    });
  }

  private handleCloseModal() {
    this.$emit("close");
  }

  private submitForm() {
    (this.$refs["create-user-form"] as any).validate(async (valid: boolean) => {
      if (valid) {
        try {
          this.isLoading = true;
          this.errorMsg = "";
          const payload: CreateUserPayload = {
            first_name: this.form.firstName,
            last_name: this.form.lastName,
            id_card: this.form.idCard,
            birthday: this.form.birthday
              ? moment(this.form.birthday).format("YYYY/MM/DD")
              : null,
            gender_id: Number(this.form.gender),
            id_1: this.form.id_1,
            id_2: this.form.id_2,
            avatar: null,
            phone: this.form.phone,
            address: this.form.address,
            user_status_id: Number(this.form.userStatusId),
            email: this.form.email,
            password: this.form.password,
          };
          if (!this.dataEdit) {
            await UserService.createUser(payload);
            this.$emit("reload");
          } else {
            const payloadEdit = payload as EditUserPayload;
            delete payloadEdit.password;
            const data = await UserService.editUser(this.dataEdit.id, payload);
            this.$emit("reload", data);
          }
        } catch (error: any) {
          this.errorMsg = error.response.data.message;
        } finally {
          this.isLoading = false;
        }
      } else {
        return false;
      }
    });
  }

  private resetForm(formName: string) {
    (this.$refs[formName] as any)?.resetFields();
  }
}
