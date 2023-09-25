<template>
  <div class="admin-users-page py-4" style="max-width: 99%">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Users</h2>
      <el-button
        type="primary"
        icon="el-icon-circle-plus"
        @click="visibleCreateUserModal = true"
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
      :data="listUsers"
      v-loading="isLoading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="#CACADE"
      max-height="800"
    >
      <el-table-column type="index" width="50" fixed label="#">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="70"> </el-table-column>
      <el-table-column prop="email" label="Email"> </el-table-column>
      <el-table-column prop="full_name" label="Full name"> </el-table-column>
      <el-table-column prop="id_card" label="ID card"> </el-table-column>
      <el-table-column prop="birthday" label="Birthday"> </el-table-column>
      <el-table-column label="Gender">
        <template slot-scope="scope" v-if="scope.row">
          {{ scope.row.gender?.name }}
        </template>
      </el-table-column>
      <el-table-column label="Avatar">
        <template slot-scope="scope" v-if="scope.row">
          <img
            class="avatar"
            v-if="scope.row.avatar"
            :src="handleImagePath(scope.row.avatar)"
            alt=""
          />
          <img
            v-else
            class="avatar"
            src="@/assets/images/avatar_default.jpeg"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column label="Updated At" prop="updated_at_formatted">
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
    <CreateUserModal
      :visible="visibleCreateUserModal"
      @close="
        visibleCreateUserModal = false;
        userEdit = null;
      "
      @reload="handleReload"
      :dataEdit="userEdit"
    />
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
