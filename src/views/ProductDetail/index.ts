import { Component, Vue } from "vue-property-decorator";
import Input from "@/components/Base/Input/Input.vue";
import { PRODUCTS_DUMMY } from "@/dummies/product";
import { Product } from "@/types/product";
import { CartItem } from "@/store/modules/cart";
import { ProductService } from "@/services/product";
import { handleImagePath } from "@/helpers/handleImagePath";
import "swiper/dist/css/swiper.css";

import VueAwesomeSwiper from "vue-awesome-swiper";
const { swiper, swiperSlide } = VueAwesomeSwiper;

@Component({
  name: "product-detail-page",
  components: {
    Input,
    swiper,
    swiperSlide,
  },
  // directives: {
  //   swiper: directive,
  // },
})
export default class ProductDetailPage extends Vue {
  private quantity = 1;
  private product = {} as Product;
  private isLoading = true;

  private activeIndex = 0;
  private activeImage = "";

  private swiperOption = {
    slidesPerView: "auto",
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  private handleImagePath = handleImagePath;

  get id(): string {
    return this.$route.params.id;
  }

  get swiper(): any {
    return (this.$refs.mySwiper as any).swiper;
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

  private handleAddToCart() {
    this.$store.dispatch("cart/addToCart", {
      ...this.product,
      total: this.quantity,
    } as CartItem);
  }

  private onSwiper = (swiper: any) => {
    console.log(swiper);
  };
}
