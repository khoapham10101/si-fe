<template>
  <header class="header w-100 py-2 border-bottom shadow-sm">
    <div
      class="container-fluid d-flex justify-content-between align-items-center"
    >
      <div class="d-flex gap-4 align-items-center">
        <button
          @click="$emit('clickCollapse')"
          class="btn-collapse-sidebar text-secondary"
        >
          <i class="fa-solid fa-bars"></i>
        </button>

        <div class="h-fit">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in breadCrumbItems"
              :key="index"
              class="text-capitalize"
              >{{ item }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
      </div>
      <div class="d-flex align-items-center gap-1">
        <p>{{ profile?.email }}</p>
        <DropdownUser />
      </div>
    </div>
  </header>
</template>

<script lang="ts" src="./Header.ts"></script>

<style lang="scss" scoped>
@import "./Header.scss";
</style>
