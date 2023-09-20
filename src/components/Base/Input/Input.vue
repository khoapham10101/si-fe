<template>
  <div :class="['input-component', className]">
    <div :class="`input-group input-group-${size} has-validation`">
      <span class="input-group-text" v-if="prefix">{{ prefix }}</span>
      <input
        :id="id"
        :type="type"
        :class="[
          'form-control',
          // { 'is-valid': isValid && required },
          // { 'is-invalid': !isValid && required },
          inputClass,
        ]"
        :aria-label="ariaLabel"
        :aria-describedby="`inputGroup-sizing-${size}`"
        :disabled="disabled"
        :placeholder="placeholder"
        :required="required"
        :autocomplete="autoComplete"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur', $event)"
        @keyup="$emit('keyup', $event)"
        @keydown="$emit('keydown', $event)"
        @keypress="$emit('keypress', $event)"
      />
      <span class="input-group-text" v-if="suffix">{{ suffix }}</span>

      <div class="invalid-feedback" v-if="!!invalidFeedback">
        {{ invalidFeedback }}
      </div>

      <div class="valid-feedback" v-if="!!validFeedback">
        {{ validFeedback }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Input.ts"></script>

<style lang="scss" scoped>
@import "./Input.scss";
</style>
