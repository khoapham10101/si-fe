import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { handleImagePath } from "@/helpers/handleImagePath";
import { Brand } from "@/types/product";
import { CreateBrandPayload } from "@/services/brands/type";
import { BrandService } from "@/services/brands";

@Component({
  name: "create-brand-modal",
  components: {
    //
  },
})
export default class CreateBrandModal extends Vue {
  @Prop({ default: false }) private visible!: boolean;
  @Prop({ default: undefined }) private dataEdit?: Brand;

  private handleImagePath = handleImagePath;
  private title = "Create New Brand";

  private form = {
    name: "",
  };

  private rules = {
    name: [
      {
        required: true,
        message: "Please input brand name",
        trigger: "blur",
      },
    ],
  };

  private isLoading = false;
  private errorMsg = "";

  @Watch("visible")
  private visibleChange() {
    this.resetForm("create-brand-form");
    if (this.dataEdit) {
      this.title = "Edit Brand";
      this.form.name = this.dataEdit.name;
    } else {
      this.title = "Create New Brand";
      this.form.name = "";
    }
  }

  private handleCloseModal() {
    this.$emit("close");
  }

  private submitForm() {
    (this.$refs["create-brand-form"] as any).validate(
      async (valid: boolean) => {
        if (valid) {
          try {
            this.isLoading = true;
            this.errorMsg = "";
            const payload: CreateBrandPayload = {
              name: this.form.name,
            };
            if (!this.dataEdit) {
              await BrandService.createBrand(payload);
              this.$emit("reload");
            } else {
              const data = await BrandService.editBrand(
                this.dataEdit.id,
                payload
              );
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
      }
    );
  }

  private resetForm(formName: string) {
    (this.$refs[formName] as any)?.resetFields();
  }
}
