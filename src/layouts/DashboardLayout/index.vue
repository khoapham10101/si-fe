<template>
  <div class="dashboard-layout">
    <div class="d-flex overflow-hidden">
      <div :class="['sidebar', { mobile: isMobile }, { open: openSidebar }]">
        <div class="d-flex justify-content-end">
          <button
            class="btn-close-sidebar text-light"
            @click="openSidebar = false"
            v-if="isMobile"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <Sidebar :isCollapse="collapseSidebar" />
      </div>
      <div class="flex-1 w-100">
        <Header @clickCollapse="handleCollapseSidebar()" />
        <main class="main-content overflow-hidden container-fluid">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
