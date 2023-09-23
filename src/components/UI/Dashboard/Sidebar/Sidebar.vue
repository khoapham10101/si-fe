<template>
  <el-menu
    default-active="1"
    :collapse="isCollapse"
    :class="['sidebar-menu', { mobile: isMobile }]"
    background-color="#293042"
    text-color="#adb5bd"
    active-text-color="#e9ecef"
    :router="true"
  >
    <template v-for="menu in menuItems">
      <el-menu-item :key="menu.index" :index="menu.index" v-if="!menu.children">
        <i :class="menu.icon" v-if="menu.icon"></i>
        <span slot="title" class="mx-2">
          {{ menu.label }}
        </span>
      </el-menu-item>

      <el-submenu :key="menu.index" :index="menu.index" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon" v-if="menu.icon"></i>
          <span slot="title" class="mx-2">{{ menu.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="submenu in menu.children"
            :key="submenu.index"
            :index="submenu.index"
          >
            <i :class="submenu.icon" v-if="submenu.icon"></i>
            <span slot="title" class="mx-2">
              {{ submenu.label }}
            </span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script lang="ts" src="./Sidebar.ts"></script>

<style lang="scss">
@import "./Sidebar.scss";
</style>
