<script setup lang="ts"></script>

<template>
  <div class="wrapper-small grey-darkest-bg alpha-80 round-edges">
    <div class="container grey-lightest-bg round-edges">
      <h1 class="bold-title text-bigger grey-darkest-text">PLAN</h1>
      <input
        type="text"
        class="input-text grey-light-bg text-medium placeholder-text grey-darkest-text round-edges shadow-out no-border"
        id="plan-title"
        placeholder="Title"
      />
      <textarea
        type="text"
        class="input-text-bigger grey-light-bg text-medium placeholder-text grey-darkest-text round-edges shadow-out no-border"
        id="plan-description"
        placeholder="Description"
      >
      </textarea>
    </div>
    <!-- handle the cool drop-in menus-->
    <div class="button-tamer">
      <div class="sub-button-tamer">
        <button
          class="button-normal purple-main-bg text-small grey-darkest-text round-edges shadow-out no-border"
        >
          Plan
        </button>
      </div>
      <div class="sub-button-tamer">
        <button
          class="button-normal red-main-bg text-small grey-lightest-text round-edges shadow-out no-border"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 460px;
  height: 362px;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 13px;
  padding-bottom: 13px;
  align-content: center;
}

.button-tamer {
  margin-top: 13px;
  margin-bottom: 13px;
  width: 480px;
  height: 56px;
  text-align: center;
}

.sub-button-tamer {
  width: 240px;
  height: 56px;
  text-align: center;
}
</style>
