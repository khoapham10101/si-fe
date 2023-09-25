<template>
  <div class="create-brand-modal">
    <el-dialog
      :title="title"
      :visible="visible"
      @close="handleCloseModal()"
      :destroy-on-close="true"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="create-brand-form"
        label-position="top"
        v-loading="isLoading"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" placeholder="Brand name"></el-input>
        </el-form-item>

        <el-alert
          v-if="!!errorMsg"
          :title="errorMsg"
          type="error"
          show-icon
          :closable="false"
        >
        </el-alert>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="handleCloseModal()">Cancel</el-button>
        <el-button
          type="primary"
          @click="submitForm('create-brand-form')"
          :disabled="isLoading"
          >Submit</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./CreateBrandModal.ts"></script>

<style lang="scss" scoped>
@import "./CreateBrandModal.scss";
</style>
