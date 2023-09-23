<template>
  <div :class="['select-component', className]">
    <select
      :id="id"
      :class="['form-select', selectClass]"
      @change="(e) => $emit('input', e.target.value)"
      :value="value"
      :required="required"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :class="option.className"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" src="./Select.ts"></script>

<style lang="scss" scoped>
@import "./Select.scss";
</style>
