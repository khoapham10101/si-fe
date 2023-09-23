<template>
  <div class="admin-products-page py-4" style="max-width: 99%">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Products</h2>
      <el-button
        type="primary"
        @click="visibleCreateProductModal = true"
        icon="el-icon-circle-plus"
        >Create</el-button
      >
    </div>
    <div class="input-search my-3">
      <el-input
        placeholder="Search..."
        v-model="keyword"
        @input="handleSearch()"
      >
        <template slot="append">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch()"
          ></el-button>
        </template>
      </el-input>
    </div>

    <el-table
      :data="listProducts"
      v-loading="isLoading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="#CACADE"
      max-height="800"
    >
      <el-table-column type="index" width="50" fixed label="#">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="70"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column label="Brand">
        <template slot-scope="scope" v-if="scope.row">
          {{ scope.row.brand.name }}
        </template>
      </el-table-column>

      <el-table-column prop="price" label="Price" width="100">
      </el-table-column>
      <el-table-column prop="quantity" label="Quantity" width="100">
      </el-table-column>
      <el-table-column prop="sku" label="Sku"> </el-table-column>
      <el-table-column prop="updated_at_formatted" label="Updated At">
      </el-table-column>

      <el-table-column fixed="right" width="100">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="mini"
            circle
            @click="openFormEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            icon="el-icon-delete"
            size="mini"
            circle
            @click="openConfirmDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="my-4 d-flex justify-content-end">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="maxPerPage"
        layout="sizes, prev, pager, next"
        :total="totalItems"
        hide-on-single-page
        background
      >
      </el-pagination>
    </div>

    <CreateProductModal
      :visible="visibleCreateProductModal"
      @close="
        visibleCreateProductModal = false;
        productEdit = null;
      "
      @reload="handleReload"
      :dataEdit="productEdit"
    />
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
