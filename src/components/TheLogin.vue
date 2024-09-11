<script setup lang="ts">
// imports and initial variable declarations go here
</script>

<template>
  <div class="container grey-lightest-bg round-edges">
    <h1 class="text-bigger grey-darkest-text">LOG IN</h1>
    <input
      type="text"
      class="text-medium placeholder-text grey-darkest-text round-edges shadow-out no-border"
      id="login-username"
      placeholder="Username"
    />
    <input />
    <input
      type="hidden"
      class="text-medium placeholder-text grey-darkest-text round-edges shadow-out no-border"
      id="login-password"
      placeholder="Password"
    />
    <input />
    <button class="login-button text-medium grey-darkest-text round-edges shadow-out no-border">
      Log In
    </button>
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
}

.login-button {
  width: 160px;
  height: 56px;
  align-content: center;
}
</style>
