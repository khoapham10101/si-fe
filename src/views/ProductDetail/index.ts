import { Component, Vue } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";
import { PRODUCTS_DUMMY } from "@/dummies/product";
import { Product, ProductImage } from "@/types/product";
import { ProductService } from "@/services/product";
import { handleImagePath } from "@/helpers/handleImagePath";
import "swiper/dist/css/swiper.css";

import VueAwesomeSwiper from "vue-awesome-swiper";
import { WishlistService } from "@/services/wishlist";
import { CartService } from "@/services/cart";
import { PATH } from "@/constants/path";
const { swiper, swiperSlide } = VueAwesomeSwiper;

@Component({
  name: "product-detail-page",
  components: {
    Input,
    swiper,
    swiperSlide,
  },
})
export default class ProductDetailPage extends Vue {
  private quantity = 1;
  private product = {} as Product;
  private isLoading = true;
  private isAddToCardLoading = false;
  private isWishlistLoading = false;

  private activeIndex = 0;
  private activeImage = "";

  private swiperOption = {
    slidesPerView: "auto",
    spaceBetween: 10,
    centeredSlides: true,
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    initialSlide: 3,
  };

  private handleImagePath = handleImagePath;

  get id(): string {
    return this.$route.params.id;
  }

  get swiper(): any {
    return (this.$refs.mySwiper as any).swiper;
  }

  get isAuthenticated(): boolean {
    return this.$store.getters["auth/authState"].isAuthenticated;
  }

  get productsWishlist(): Product[] | null {
    return this.$store.getters["product/productsWishlist"];
  }

  get isWishlist(): boolean {
    return (
      this.productsWishlist?.some((item) => item.id === Number(this.id)) ||
      false
    );
  }

  get isGetWishlistLoading(): boolean {
    return this.$store.getters["product/isWishlistLoading"];
  }

  private mounted() {
    this.getProductDetail();
    // console.log(this.swiper);
  }

  private async getProductDetail() {
    try {
      this.isLoading = true;
      this.product = await ProductService.getPublicProductDetail(this.id);
      this.activeImage = this.product.images[0].path;
    } catch (error) {
      //
    } finally {
      this.isLoading = false;
    }
  }

  private increaseQuantity() {
    this.quantity = this.quantity + 1;
  }

  private decreaseQuantity() {
    if (this.quantity === 1) {
      return;
    }
    this.quantity = this.quantity - 1;
  }

  private onBlurInputQuantity() {
    if (!this.quantity) {
      this.quantity = 1;
    }
  }

  private async handleAddToCart() {
    if (!this.quantity) {
      return;
    }
    if (!this.isAuthenticated) {
      this.$router.push({
        path: PATH.Login,
      });
      return;
    }
    try {
      this.isAddToCardLoading = true;
      await CartService.createCart({
        product_id: Number(this.id),
        quantity: this.quantity,
      });
      const { data } = await CartService.getListCarts();
      this.$store.dispatch("cart/updateCarts", data);
      this.$message({
        message: "Added to cart this product successfully",
        type: "success",
      });
    } catch (error) {
      //
    } finally {
      this.isAddToCardLoading = false;
    }
  }

  private onSwiper = (swiper: any) => {
    console.log(swiper);
  };

  private swiperItemClick(path: string) {
    this.activeImage = path;
  }

  private handleWishlist() {
    if (!this.isAuthenticated) {
      this.$router.push({
        path: PATH.Login,
      });
      return;
    }

    if (this.isWishlist) {
      this.handleDeleteWishlist();
    } else {
      this.handleCreateWishList();
    }
  }

  private async handleCreateWishList() {
    try {
      this.isWishlistLoading = true;
      await WishlistService.createWishlist(Number(this.id));
      this.$store.dispatch("product/updateIsWishListLoading", true);
      const { data } = await WishlistService.getWishlists({
        per_page: 100,
        current_page: 1,
      });
      const productsWishlist = data.map((item) => item.product);
      this.$store.dispatch("product/updateProductsWishlist", productsWishlist);
      this.$message({
        message: "Create wishlist successfully",
        type: "success",
      });
    } catch (error: any) {
      this.$message({
        message: error.response.data.message,
        type: "error",
      });
    } finally {
      this.isWishlistLoading = false;
      this.$store.dispatch("product/updateIsWishListLoading", false);
    }
  }

  private async handleDeleteWishlist() {
    try {
      this.isWishlistLoading = true;
      await WishlistService.deleteWishlist(Number(this.id));

      this.$store.dispatch("product/updateIsWishListLoading", true);
      const { data } = await WishlistService.getWishlists({
        per_page: 100,
        current_page: 1,
      });
      const productsWishlist = data.map((item) => item.product);
      this.$store.dispatch("product/updateProductsWishlist", productsWishlist);
      this.$message({
        message: "Delete wishlist successfully",
        type: "success",
      });
      this.$emit("reloadWishlist");
    } catch (error: any) {
      this.$message({
        message: error.response.data.message,
        type: "error",
      });
    } finally {
      this.isWishlistLoading = false;
      this.$store.dispatch("product/updateIsWishListLoading", false);
    }
  }

  private handleClickTab(tab: any) {
    // console.log(tab);
  }
}
