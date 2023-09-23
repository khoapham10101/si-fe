<template>
  <div class="register-page d-flex align-items-center">
    <div class="container d-flex justify-content-center">
      <div class="form-wrapper w-100 p-4 shadow">
        <div v-loading="isLoading">
          <div class="logo mb-3">
            <div class="col-md-12 text-center">
              <h1>Register</h1>
            </div>
          </div>

          <form @submit.prevent="submit">
            <div class="mt-3">
              <label for="firstName">First name</label>
              <Input
                v-model="form.firstName.value"
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                :inputClass="{
                  'is-invalid': !form.firstName.value && form.email.blured,
                }"
                :required="true"
                :invalidFeedback="form.firstName.errorMsg"
                @blur="form.firstName.blured = true"
              />
            </div>

            <div class="mt-3">
              <label for="lastName">Last name</label>
              <Input
                v-model="form.lastName.value"
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                :inputClass="{
                  'is-invalid': !form.lastName.value && form.lastName.blured,
                }"
                :required="true"
                :invalidFeedback="form.lastName.errorMsg"
                @blur="form.lastName.blured = true"
              />
            </div>

            <div class="mt-3">
              <label for="idCard">ID Card</label>
              <Input
                v-model="form.idCard.value"
                type="number"
                id="idCard"
                name="idCard"
                placeholder="Enter ID Card"
                :inputClass="{
                  'is-invalid': !form.idCard.value && form.idCard.blured,
                }"
                :required="true"
                :invalidFeedback="form.idCard.errorMsg"
                @blur="form.idCard.blured = true"
              />
            </div>

            <div class="mt-3">
              <label for="email">Email address</label>
              <Input
                v-model="form.email.value"
                id="email"
                type="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                :inputClass="{
                  'is-invalid':
                    !validEmail(form.email.value) && form.email.blured,
                }"
                :required="true"
                :invalidFeedback="form.email.errorMsg"
                @blur="form.email.blured = true"
              />
            </div>

            <div class="mt-3">
              <label for="password">Password</label>
              <Input
                v-model="form.password.value"
                id="password"
                type="password"
                name="password"
                placeholder="Enter Password"
                :inputClass="{
                  'is-invalid':
                    !validPassword(form.password.value) && form.password.blured,
                }"
                :required="true"
                :invalidFeedback="form.password.errorMsg"
                @blur="form.password.blured = true"
              />
            </div>

            <div class="mt-3">
              <label for="confirmPassword">Confirm password</label>
              <Input
                v-model="form.confirmPassword.value"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Enter Confirm password"
                :inputClass="{
                  'is-invalid':
                    !validConfirmPassword(form.confirmPassword.value) &&
                    form.confirmPassword.blured,
                }"
                :required="true"
                :invalidFeedback="form.confirmPassword.errorMsg"
                @blur="form.confirmPassword.blured = true"
              />
            </div>

            <div class="mt-3">
              <label for="birthday">Birthday</label>
              <el-date-picker
                class="w-100"
                id="birthday"
                v-model="form.birthday.value"
                type="date"
                placeholder="Pick a day"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>

            <div class="mt-3">
              <label for="gender">Gender</label>
              <Select
                id="gender"
                :options="genderOptions"
                v-model="form.gender.value"
              />
            </div>

            <div
              class="alert alert-danger mt-4"
              role="alert"
              v-if="!!errorMessage"
            >
              {{ errorMessage }}
            </div>

            <div class="col-md-12 text-center mt-4">
              <button
                type="submit"
                class="btn btn-block mybtn btn-primary tx-tfm w-100"
              >
                Register
              </button>
            </div>

            <div class="pt-3 mt-3 text-center">
              <p>
                Do have account
                <router-link
                  to="login"
                  class="text-primary text-decoration-none"
                >
                  Sign in here</router-link
                >
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
