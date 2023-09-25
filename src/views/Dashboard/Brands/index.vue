<template>
  <div class="admin-brands-page py-4" style="max-width: 99%">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Brands</h2>
      <el-button
        type="primary"
        icon="el-icon-circle-plus"
        @click="visibleCreateBrandModal = true"
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
      :data="listBrands"
      v-loading="isLoading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="#CACADE"
      max-height="800"
    >
      <el-table-column type="index" width="50" fixed label="#">
      </el-table-column>
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column label="Created At">
        <template slot-scope="scope" v-if="scope.row">
          {{ moment(scope.row.created_at).format("DD/MM/YYYY LT") }}
        </template>
      </el-table-column>
      <el-table-column label="Updated At">
        <template slot-scope="scope" v-if="scope.row">
          {{ moment(scope.row.updated_at).format("DD/MM/YYYY LT") }}
        </template>
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

    <CreateBrandModal
      :visible="visibleCreateBrandModal"
      @close="
        visibleCreateBrandModal = false;
        brandEdit = null;
      "
      @reload="handleReload"
      :dataEdit="brandEdit"
    />
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
