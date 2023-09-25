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

  private async handleAddToCart() {
    if (!this.isAuthenticated) {
      this.$router.push({
        path: PATH.Login,
      });
      return;
    }
    try {
      this.isAddToCardLoading = true;
      await CartService.createCart({ product_id: Number(this.id) });
      const { data } = await CartService.getListCarts();
      this.$store.dispatch("cart/updateCarts", data);
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

  private async handleCreateWishList() {
    if (!this.isAuthenticated) {
      this.$router.push({
        path: PATH.Login,
      });
      return;
    }
    try {
      this.isWishlistLoading = true;
      await WishlistService.createWishlist(Number(this.id));
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
    }
  }

  private handleClickTab(tab: any) {
    // console.log(tab);
  }
}
