import { SelectOption } from "@/components/Base/Select/Select";
import { ProductService } from "@/services/product";
import { CreateProductPayload } from "@/services/product/type";
import { Brand, BrandDropdown, Product, ProductImage } from "@/types/product";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { handleImagePath } from "@/helpers/handleImagePath";

@Component({
  name: "create-product-modal",
  components: {
    //
  },
})
export default class CreateProductModal extends Vue {
  @Prop({ default: false }) private visible!: boolean;
  @Prop({ default: undefined }) private dataEdit?: Product;

  private handleImagePath = handleImagePath;
  private title = "";
  private form = {
    name: "",
    sku: "",
    description: "",
    deliveryInfomation: "",
    warrantyInformation: "",
    price: "",
    quantity: "",
    brandId: "",
  };
  private rules = {
    name: [
      {
        required: true,
        message: "Please input product name",
        trigger: "blur",
      },
    ],
    sku: [
      {
        required: true,
        message: "Please input sku",
        trigger: "blur",
      },
    ],
    price: [
      {
        required: true,
        message: "Please input price",
        trigger: "blur",
      },
      {
        min: 0,
      },
    ],
    quantity: [
      {
        required: true,
        message: "Please input quantity",
        trigger: "blur",
      },
    ],
    brandId: [
      {
        required: true,
        message: "Please select brand",
        trigger: "change",
      },
    ],
  };

  private listFileUpload = [] as File[] | any[];
  private listFileUploaded = [] as ProductImage[];
  private listFileDelete: string[] = [];
  private isLoading = false;
  private errorMsg = "";

  @Watch("visible")
  private visibleChange() {
    this.listFileDelete = [];
    this.resetForm("create-product-form");
    if (this.dataEdit) {
      this.title = "Edit product";
      (this.form.brandId = this.dataEdit.brand_id.toString()),
        (this.form.description = this.dataEdit.description || ""),
        (this.form.name = this.dataEdit.name),
        (this.form.price = this.dataEdit.price.toString()),
        (this.form.quantity = this.dataEdit.quantity.toString()),
        (this.form.sku = this.dataEdit.sku),
        (this.form.warrantyInformation =
          this.dataEdit.warranty_information || "");
      this.form.deliveryInfomation = this.dataEdit.delivery_infomation || "";
      this.listFileUploaded = this.dataEdit?.images as ProductImage[];
    } else {
      this.title = "Create New Product";
      (this.form.name = ""),
        (this.form.sku = ""),
        (this.form.description = ""),
        (this.form.warrantyInformation = ""),
        (this.form.deliveryInfomation = ""),
        (this.form.price = ""),
        (this.form.quantity = ""),
        (this.form.brandId = "");
    }
    // console.log(this.dataEdit);
  }

  get brandsList(): BrandDropdown[] | null {
    return this.$store.getters["product/brandsDropdown"];
  }

  get brandsOption(): SelectOption[] {
    if (!this.brandsList) {
      return [] as SelectOption[];
    }
    return this.brandsList?.map((item) => {
      return {
        label: item.name,
        value: item.id.toString(),
      } as SelectOption;
    });
  }

  private handleCloseModal() {
    this.$emit("close");
  }

  private onFileChange(file: File, fileList: FileList) {
    // console.log({ file, fileList });
    this.listFileUpload = [];
    (fileList as any).forEach((item: any) => {
      this.listFileUpload.push(item);
    });
  }

  private handleRemoveFile(file: File | any, path = "") {
    if (path) {
      this.listFileUploaded = this.listFileUploaded.filter(
        (item) => item.path !== path
      );
      this.listFileDelete = [...this.listFileDelete, path];
      return;
    }
    // console.log(file);
    (this.$refs.upload as any).uploadFiles = (
      this.$refs.upload as any
    ).uploadFiles.filter((item: any) => item.uid !== file.uid);

    this.listFileUpload = (this.$refs.upload as any).uploadFiles;
  }

  private onRemove(file: File, fileList?: FileList) {
    // console.log({ file, fileList });
  }

  private submitForm(formName: string) {
    (this.$refs["create-product-form"] as any).validate(
      async (valid: boolean) => {
        if (valid) {
          try {
            this.isLoading = true;
            this.errorMsg = "";
            const payload: CreateProductPayload = {
              name: this.form.name,
              sku: this.form.sku,
              description: this.form.description,
              warranty_information: this.form.warrantyInformation,
              delivery_infomation: this.form.deliveryInfomation,
              price: Number(this.form.price),
              quantity: Number(this.form.quantity),
              brand_id: Number(this.form.brandId),
              images: (this.listFileUpload as any).map((item: any) => item.raw),
            };
            if (!this.dataEdit) {
              await ProductService.createProduct(payload);
              this.$emit("reload");
            } else {
              if (this.listFileDelete.length > 0) {
                //
              }
              await Promise.all(
                this.listFileDelete.map((item) => {
                  return ProductService.deleteProductFile(
                    Number(this.dataEdit?.id),
                    item
                  );
                })
              );
              const data = await ProductService.editProduct(
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
    this.listFileUploaded = [];
    this.listFileUpload = [];
    this.errorMsg = "";
  }
}
