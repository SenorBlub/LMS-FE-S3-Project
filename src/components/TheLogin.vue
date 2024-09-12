<script setup lang="ts">
// imports and initial variable declarations go here
</script>

<template>
  <div>
    <div class="container grey-lightest-bg round-edges">
      <h1 class="header-text text-bigger grey-darkest-text">LOG IN</h1>
      <!-- <form  @submit.prevent="handleLogin" > -->
      <!-- Add form block with submit handler -->
      <input
        type="text"
        class="login-input grey-light-bg text-medium placeholder-text grey-darkest-text round-edges shadow-out no-border"
        id="login-username"
        placeholder="Username"
      />
      <input
        type="password"
        class="login-input grey-light-bg text-medium placeholder-text grey-darkest-text round-edges shadow-out no-border"
        id="login-password"
        placeholder="Password"
      />
    </div>
    <div class="button-tamer-div">
      <button
        class="login-button purple-main-bg text-medium grey-darkest-text round-edges shadow-out no-border"
      >
        Log In
      </button>
    </div>
    <!-- </form>-->
  </div>
</template>

<style scoped>
.header-text {
  -webkit-text-stroke-width: thin;
}

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

.login-button {
  width: 160px;
  height: 56px;
  align-content: center;
  align-self: center;
  text-indent: 0px;
}

.button-tamer-div {
  margin-top: 13px;
  width: 480px;
  height: 56px;
  text-align: center;
}
</style>
