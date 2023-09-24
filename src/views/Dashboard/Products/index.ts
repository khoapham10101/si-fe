import { ProductService } from "@/services/product";
import { Brand, Product } from "@/types/product";
import { Component, Vue, Watch } from "vue-property-decorator";
import CreateProductModal from "@/components/UI/Dashboard/CreateProductModal/CreateProductModal.vue";
import { BrandService } from "@/services/brands";

@Component({
  name: "admin-product-page",
  components: {
    CreateProductModal,
  },
})
export default class AdminProductsPage extends Vue {
  private keyword = "";
  private listProducts = [] as Product[];
  private listProductsOrigin = [] as Product[];

  private currentPage = 1;
  private maxPerPage = 10;
  private totalPages = 1;
  private totalItems = 0;

  private isLoading = false;
  private visibleCreateProductModal = false;
  private productEdit: Product | null = null;

  get brandsList(): Brand[] | null {
    return this.$store.getters["product/brands"];
  }

  private mounted() {
    this.getProducts();
    if (!this.brandsList) {
      this.getBrandDropdown();
    }
  }

  private async getProducts() {
    try {
      this.isLoading = true;
      const { data, meta } = await ProductService.getListProducts({
        current_page: this.currentPage,
        per_page: this.maxPerPage,
      });
      this.listProducts = data;
      this.listProductsOrigin = data;
      this.totalPages = meta.last_page;
      this.totalItems = meta.total;
    } catch (error) {
      //
    } finally {
      this.isLoading = false;
    }
  }

  private async getBrandDropdown() {
    try {
      const { data } = await BrandService.getBrandsDropdown({
        filters: {
          name: "",
        },
      });
      this.$store.dispatch("product/updateBrandsDropdown", data);
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
    this.getProducts();
  }
  private handleCurrentChange(val: number) {
    this.currentPage = val;
    this.getProducts();
  }

  private handleReload(data?: Product) {
    this.visibleCreateProductModal = false;
    if (!data) {
      this.currentPage = 1;
      this.getProducts();
    } else {
      const indexEdited = this.listProducts.findIndex(
        (item) => item.id === data.id
      );
      this.listProducts.splice(indexEdited, 1, data);
      this.listProductsOrigin.splice(indexEdited, 1, data);
    }
  }

  private handleSearch() {
    this.listProducts = this.listProductsOrigin.filter((item) =>
      item.name.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  private openConfirmDelete(index: number, row: Product) {
    this.$confirm("Do you want to delete this product?", "Confirm", {
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      type: "warning",
    })
      .then(() => {
        this.handleDelete(row.id);
      })
      .catch(() => {
        //
      });
  }

  private async handleDelete(productId: number) {
    // console.log("handleDelete", productId);
    try {
      this.isLoading = true;
      await ProductService.deleteProduct(productId);
      this.getProducts();
    } catch (error) {
      //
    }
  }

  private openFormEdit(index: number, row: any) {
    this.productEdit = row;
    this.visibleCreateProductModal = true;
  }
}
