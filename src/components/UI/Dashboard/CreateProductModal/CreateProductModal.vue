<template>
  <div class="create-product-modal">
    <el-dialog
      :title="title"
      :visible="visible"
      @close="handleCloseModal()"
      :destroy-on-close="true"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="create-product-form"
        label-position="top"
        v-loading="isLoading"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" placeholder="Product name"></el-input>
        </el-form-item>

        <el-form-item label="Sku" prop="sku">
          <el-input v-model="form.sku" placeholder="Sku"></el-input>
        </el-form-item>

        <el-form-item label="Description" prop="description">
          <el-input
            v-model="form.description"
            placeholder="Description"
          ></el-input>
        </el-form-item>

        <el-form-item label="Warranty information" prop="warrantyInformation">
          <el-input
            v-model="form.warrantyInformation"
            placeholder="Warranty information"
          ></el-input>
        </el-form-item>

        <el-form-item label="Price" prop="price">
          <el-input
            v-model="form.price"
            type="number"
            placeholder="Price"
            min="0"
            onkeyup="if(this.value<0){this.value= this.value * -1}"
          ></el-input>
        </el-form-item>

        <el-form-item label="Quantity" prop="quantity">
          <el-input
            v-model="form.quantity"
            type="number"
            placeholder="Quantity"
            min="0"
            oninput="this.value = Math.abs(this.value)"
          ></el-input>
        </el-form-item>

        <el-form-item label="Brand" prop="brandId">
          <el-select v-model="form.brandId" placeholder="Brand" class="w-100">
            <el-option
              v-for="item in brandsOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Images">
          <div class="list-file-preview">
            <!-- uploaded -->
            <div
              class="preview-item"
              v-for="item in listFileUploaded"
              :key="item.path"
            >
              <img :src="handleImagePath(item.path)" alt="" />
              <button
                type="button"
                class="btn-remove-file shadow"
                @click="handleRemoveFile(item, item.path)"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <!-- new upload -->
            <div
              class="preview-item"
              v-for="(item, index) in listFileUpload"
              :key="index"
            >
              <img :src="item.url" alt="" />
              <button
                type="button"
                class="btn-remove-file shadow"
                @click="handleRemoveFile(item)"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          <el-upload
            class="upload-product-image mt-3"
            ref="upload"
            :auto-upload="false"
            action=""
            multiple
            :on-change="onFileChange"
            :on-remove="onRemove"
            accept="image/png, image/jpeg"
            :show-file-list="false"
            list-type="picture-card"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <el-alert
        v-if="!!errorMsg"
        :title="errorMsg"
        type="error"
        show-icon
        :closable="false"
      >
      </el-alert>

      <span slot="footer" class="dialog-footer">
        <el-button @click.native="handleCloseModal()">Cancel</el-button>
        <el-button
          type="primary"
          @click="submitForm('create-product-form')"
          :disabled="isLoading"
          >Submit</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./CreateProductModal.ts"></script>

<style lang="scss" scoped>
@import "./CreateProductModal.scss";
</style>
