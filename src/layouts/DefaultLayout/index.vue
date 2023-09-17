<template>
  <div class="default-layout">
    <header>header</header>
    <main class="main-content">
      <slot />
    </main>
    <footer>footer</footer>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
