<template>
  <div class="login-page d-flex align-items-center">
    <div class="container d-flex justify-content-center">
      <div class="form-wrapper w-100 p-4 shadow">
        <div class="logo mb-3">
          <div class="col-md-12 text-center">
            <h1>Login</h1>
          </div>
        </div>

        <form @submit.prevent="submit">
          <div class="my-3">
            <label for="email">Email address</label>
            <Input
              v-model="form.email.value"
              id="email"
              type="text"
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

          <div class="col-md-12 text-center mt-4">
            <button
              type="submit"
              class="btn btn-block mybtn btn-primary tx-tfm w-100"
            >
              Login
            </button>
          </div>

          <div class="pt-3 mt-3 text-center">
            <p>
              Don't have account
              <router-link
                to="register"
                class="text-primary text-decoration-none"
              >
                Sign up here</router-link
              >
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
