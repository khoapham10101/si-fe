<template>
  <div class="create-user-modal">
    <el-dialog
      :title="title"
      :visible="visible"
      @close="handleCloseModal()"
      :destroy-on-close="true"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="create-user-form"
        label-position="top"
        v-loading="isLoading"
      >
        <el-form-item label="First name" prop="firstName">
          <el-input
            v-model="form.firstName"
            placeholder="First name"
          ></el-input>
        </el-form-item>

        <el-form-item label="Last name" prop="lastName">
          <el-input v-model="form.lastName" placeholder="Last name"></el-input>
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input
            v-model="form.email"
            placeholder="Email"
            :disabled="!!dataEdit"
          ></el-input>
        </el-form-item>

        <el-form-item label="Password" prop="password" v-if="!dataEdit">
          <el-input
            v-model="form.password"
            placeholder="Password"
            type="password"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="Confirm password"
          prop="confirmPassword"
          v-if="!dataEdit"
        >
          <el-input
            v-model="form.confirmPassword"
            placeholder="Password"
            type="password"
          ></el-input>
        </el-form-item>

        <el-form-item label="ID Card" prop="idCard">
          <el-input v-model="form.idCard" placeholder="ID Card"></el-input>
        </el-form-item>

        <el-form-item label="Phone" prop="phone">
          <el-input v-model="form.phone" placeholder="Phone"></el-input>
        </el-form-item>

        <el-form-item label="User status" prop="userStatusId">
          <el-select
            v-model="form.userStatusId"
            placeholder="User status"
            class="w-100"
          >
            <el-option
              v-for="item in listUserStatusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="birthday" label="Birhday">
          <el-date-picker
            type="date"
            placeholder="Birthday"
            v-model="form.birthday"
            class="w-100"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>

        <el-form-item prop="gender" label="Gender">
          <el-select v-model="form.gender" placeholder="Select" class="w-100">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="ID 1" prop="id_1">
          <el-input v-model="form.id_1" placeholder="ID 1"></el-input>
        </el-form-item>

        <el-form-item label="ID 2" prop="id_2">
          <el-input v-model="form.id_2" placeholder="ID 2"></el-input>
        </el-form-item>

        <el-form-item label="Address" prop="address">
          <el-input v-model="form.address" placeholder="Address"></el-input>
        </el-form-item>

        <el-form-item label="Avatar">
          <el-upload
            class="upload-user-avatar"
            ref="upload-avatar"
            :auto-upload="false"
            action=""
            :on-change="onFileChange"
            :on-remove="onRemove"
            accept="image/png, image/jpeg"
            :show-file-list="false"
            :thumbnail-mode="true"
          >
            <el-button slot="trigger" size="small">upload new avatar</el-button>
          </el-upload>
          <div class="avatar-preview mt-2">
            <img :src="form.avatar" alt="" v-if="!!form.avatar" />
            <img
              src="@/assets/images/avatar_default.jpeg"
              class="img-fluid"
              alt="avatar"
              v-else
            />
          </div>
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
        <el-button type="primary" @click="submitForm()" :disabled="isLoading"
          >Submit</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./CreateUserModal.ts"></script>

<style lang="scss" scoped>
@import "./CreateUserModal.scss";
</style>
