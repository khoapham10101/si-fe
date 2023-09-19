<template>
  <div id="app">
    <component :is="layout">
      <router-view :layout.sync="layout" />
    </component>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import DefaultLayout from "@/layouts/DefaultLayout/index.vue";
import BlankLayout from "@/layouts/BlankLayout/index.vue";
import DashboardLayout from "@/layouts/DashboardLayout/index.vue";
import { DEFAULT_LAYOUT } from "./constants/common";

@Component({
  components: { DefaultLayout, BlankLayout, DashboardLayout },
})
export default class App extends Vue {
  private layout: string | null = null;

  private created() {
    if (this.$route.meta?.layout !== undefined) {
      this.layout = this.$route.meta.layout;
    } else {
      this.layout = DEFAULT_LAYOUT;
    }
  }

  @Watch("$route")
  private onChangeRouter(val: any) {
    window.scrollTo({
      top: 0,
    });
    console.log(val.meta.layout);

    if (val.meta.layout !== undefined) {
      console.log(val.meta.layout);
      this.layout = val.meta.layout;
    } else {
      this.layout = DEFAULT_LAYOUT;
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/_main";
</style>
