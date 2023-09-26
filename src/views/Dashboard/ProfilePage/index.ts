import { SelectOption } from "@/components/Base/Select/Select";
import { Component, Vue } from "vue-property-decorator";
import { handleImagePath } from "@/helpers/handleImagePath";
import { DEFAULT_BIRTHDAY, GENDER_OPTIONS } from "@/constants/common";
import { UserStatus } from "@/types/auth";
import { EditUserPayload } from "@/services/user/type";
import { UserService } from "@/services/user";
import moment from "moment";
import { User } from "@/types/user";
import { GenderEnum } from "@/enums/common";

@Component({
  name: "profile-page",
  components: {
    //
  },
})
export default class ProfilePage extends Vue {
  private handleImagePath = handleImagePath;

  get profile(): User {
    return this.$store.getters["auth/profile"];
  }

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
    avatar: null as null | string,
  };

  private avatarUpload = null as File | any;

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

  private mounted() {
    if (!this.listUserStatus) {
      this.getListUserStatus();
    }

    (this.form.email = this.profile.email),
      (this.form.firstName = this.profile.first_name),
      (this.form.lastName = this.profile.last_name),
      (this.form.idCard = this.profile.id_card),
      (this.form.birthday = this.profile.birthday
        ? this.profile.birthday
        : DEFAULT_BIRTHDAY),
      (this.form.gender = this.profile.gender_id
        ? this.profile.gender_id.toString()
        : GenderEnum.MALE.toString()),
      (this.form.id_1 = this.profile.id_1 || ""),
      (this.form.id_2 = this.profile.id_2 || ""),
      (this.form.phone = this.profile.phone || ""),
      (this.form.address = this.profile.address || ""),
      (this.form.userStatusId = this.profile.user_status_id?.toString()),
      (this.form.avatar = this.profile.avatar),
      (this.avatarUpload = null);
  }

  private beforeDestroy() {
    this.avatarUpload = null;
    !!this.form.avatar && URL.revokeObjectURL(this.form.avatar);
  }

  private async getListUserStatus() {
    try {
      this.isLoading = true;
      const { data } = await UserService.getListUserStatus({
        filters: {
          name: "",
        },
      });
      this.$store.dispatch("user/updateListUserStatus", data);
    } catch (error) {
      //
    } finally {
      this.isLoading = false;
    }
  }

  get genderOptions(): SelectOption[] {
    return GENDER_OPTIONS;
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
    (this.$refs["profile-form"] as any).validate(async (valid: boolean) => {
      if (valid) {
        try {
          this.isLoading = true;
          this.errorMsg = "";
          const payload: EditUserPayload = {
            first_name: this.form.firstName,
            last_name: this.form.lastName,
            id_card: this.form.idCard,
            birthday: this.form.birthday
              ? moment(this.form.birthday).format("YYYY-MM-DD")
              : "",
            gender_id: Number(this.form.gender),
            id_1: this.form.id_1 || "",
            id_2: this.form.id_2 || "",
            phone: this.form.phone || "",
            address: this.form.address || "",
            user_status_id: Number(this.form.userStatusId),
            email: this.form.email,
          };

          if (this.avatarUpload !== null) {
            payload.avatar = this.avatarUpload;
          }

          const data = await UserService.editUser(this.profile.id, payload);
          // console.log(data);
          localStorage.setItem("profile", JSON.stringify(data));
          this.$store.dispatch("auth/updateProfile", data);
          this.$message({
            message: "Update profile successfully",
            type: "success",
          });
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

  private onFileChange(file: any, fileList: FileList) {
    // console.log({ file, fileList });
    this.avatarUpload = file.raw;
    this.form.avatar = URL.createObjectURL(file.raw);
  }

  private onRemove(file: File, fileList?: FileList) {
    // console.log({ file, fileList });
  }
}
