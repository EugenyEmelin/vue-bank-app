<template>
  <div class="loader-wrapper">
    <div class="lds-ripple"><div></div><div></div></div>
  </div>
</template>

<script>
export default {
	name: "Loader",
}
</script>

<style scoped lang="scss">
  .loader-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
</style>