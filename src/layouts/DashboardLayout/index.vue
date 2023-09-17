<template>
  <div class="dashboard-layout">
    <header>header</header>
    <div>
      <div>Sidebar</div>
      <main class="main-content">
        <slot />
      </main>
    </div>
    <footer>footer</footer>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
