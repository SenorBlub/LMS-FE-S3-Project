<script setup lang="ts">
// imports and initial variable declarations go here
</script>

<template>
  <div>
    <div class="container grey-lightest-bg round-edges">
      <h1 class="header-text text-bigger grey-darkest-text">REGISTER</h1>
      <!-- <form  @submit.prevent="handleLogin" > -->
      <!-- Add form block with submit handler -->
      <input
        type="text"
        class="input-text grey-light-bg text-medium placeholder-text grey-darkest-text round-edges shadow-out no-border"
        id="register-username"
        placeholder="Username"
      />
      <input
        type="text"
        class="input-text grey-light-bg text-medium placeholder-text grey-darkest-text round-edges shadow-out no-border"
        id="register-email"
        placeholder="Email"
      />
      <input
        type="password"
        class="input-text grey-light-bg text-medium placeholder-text grey-darkest-text round-edges shadow-out no-border"
        id="register-password"
        placeholder="Password"
      />
      <input
        type="password"
        class="input-text grey-light-bg text-medium placeholder-text grey-darkest-text round-edges shadow-out no-border"
        id="register-password-confirm"
        placeholder="Repeat password"
      />
    </div>
    <div class="button-tamer-div">
      <button
        class="button-normal purple-main-bg text-small grey-darkest-text round-edges shadow-out no-border"
      >
        Register
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
  height: 342px;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 13px;
  padding-bottom: 13px;
  align-content: center;
}

.register-input {
  width: 416px;
  height: 56px;
  padding-left: 15px;
  margin-top: 9px; /* thanks figma... */
}

.button-tamer-div {
  margin-top: 13px;
  margin-bottom: 13px;
  width: 480px;
  height: 56px;
  text-align: center;
}
</style>
