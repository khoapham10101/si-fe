import { UserService } from "@/services/user";
import { Component, Vue } from "vue-property-decorator";
import { Brand } from "@/types/product";
import { BrandService } from "@/services/brands";
import moment from "moment";
import CreateBrandModal from "@/components/UI/Dashboard/CreateBrandModal/CreateBrandModal.vue";

@Component({
  name: "admin-brands-page",
  components: {
    CreateBrandModal,
  },
})
export default class AdminBrandsPage extends Vue {
  private keyword = "";
  private listBrands = [] as Brand[];
  private listBrandsOrigin = [] as Brand[];

  private currentPage = 1;
  private maxPerPage = 10;
  private totalPages = 1;
  private totalItems = 0;

  private isLoading = false;
  private visibleCreateBrandModal = false;
  private brandEdit: Brand | null = null;

  private moment = moment;

  private mounted() {
    this.getListBrands();
  }

  private async getListBrands() {
    try {
      this.isLoading = true;
      const { data, meta } = await BrandService.getListBrands({
        current_page: this.currentPage,
        per_page: this.maxPerPage,
      });
      this.listBrands = data;
      this.listBrandsOrigin = data;
      this.totalPages = meta.last_page;
      this.totalItems = meta.total;
    } catch (error) {
      //
    } finally {
      this.isLoading = false;
    }
  }

  private async getListUserStatus() {
    try {
      const { data } = await UserService.getListUserStatus({
        filters: {
          name: "",
        },
      });
      this.$store.dispatch("user/updateListUserStatus", data);
    } catch (error) {
      //
    }
  }

  private handleSizeChange(val: number) {
    this.maxPerPage = val;
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      return;
    }
    this.getListBrands();
  }
  private handleCurrentChange(val: number) {
    this.currentPage = val;
    this.getListBrands();
  }

  private handleReload(data?: Brand) {
    this.visibleCreateBrandModal = false;
    if (!data) {
      this.currentPage = 1;
      this.getListBrands();
    } else {
      const indexEdited = this.listBrands.findIndex(
        (item) => item.id === data.id
      );
      this.listBrands.splice(indexEdited, 1, data);
      this.listBrandsOrigin.splice(indexEdited, 1, data);
    }
  }

  private handleSearch() {
    this.listBrands = this.listBrandsOrigin.filter((item) =>
      item.name.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  private openConfirmDelete(index: number, row: Brand) {
    this.$confirm("Are you sure to delete this brand?", "Confirm", {
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      type: "warning",
      confirmButtonClass: "el-button--danger",
    })
      .then(() => {
        this.handleDelete(row.id);
      })
      .catch(() => {
        //
      });
  }

  private async handleDelete(brandId: number) {
    try {
      this.isLoading = true;
      await BrandService.deleteBrand(brandId);
      this.getListBrands();
    } catch (error) {
      //
    }
  }

  private openFormEdit(index: number, row: any) {
    this.brandEdit = row;
    this.visibleCreateBrandModal = true;
  }
}
