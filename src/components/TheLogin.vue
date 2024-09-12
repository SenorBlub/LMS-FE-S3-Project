<script setup lang="ts">
// imports and initial variable declarations go here
</script>

<template>
  <div>
    <div class="container grey-lightest-bg round-edges">
      <h1 class="bold-title text-bigger grey-darkest-text">LOG IN</h1>
      <!-- <form  @submit.prevent="handleLogin" > -->
      <input
        type="text"
        class="input-text grey-light-bg text-medium placeholder-text grey-darkest-text round-edges shadow-out no-border"
        id="login-username"
        placeholder="Username"
      />
      <input
        type="password"
        class="input-text grey-light-bg text-medium placeholder-text grey-darkest-text round-edges shadow-out no-border"
        id="login-password"
        placeholder="Password"
      />
    </div>
    <div class="button-tamer">
      <button
        class="button-normal purple-main-bg text-small grey-darkest-text round-edges shadow-out no-border"
      >
        Log In
      </button>
    </div>
    <!-- </form>-->
  </div>
</template>

<style scoped>
.container {
  width: 460px;
  height: 198px;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 13px;
  padding-bottom: 13px;
  align-content: center;
}

.login-input {
  width: 416px;
  height: 56px;
  padding-left: 15px;
  margin-top: 9px; /* thanks figma... */
}

.button-tamer {
  margin-top: 13px;
  margin-bottom: 13px;
  width: 480px;
  height: 56px;
  text-align: center;
}
</style>
