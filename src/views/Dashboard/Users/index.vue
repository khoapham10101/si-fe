<template>
  <div class="admin-users-page py-4" style="max-width: 99%">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Users</h2>
      <el-button type="primary">Create</el-button>
    </div>
    <div class="input-search my-3">
      <el-input placeholder="Search..." v-model="inputSearch">
        <template slot="append">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch()"
          ></el-button>
        </template>
      </el-input>
    </div>

    <el-table :data="tableData">
      <el-table-column fixed prop="date" label="Date" width="150">
      </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="state" label="State"> </el-table-column>
      <el-table-column prop="city" label="City"> </el-table-column>
      <el-table-column prop="address" label="Address"> </el-table-column>
      <el-table-column prop="zip" label="Zip"> </el-table-column>
      <el-table-column fixed="right" label="Operations" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
