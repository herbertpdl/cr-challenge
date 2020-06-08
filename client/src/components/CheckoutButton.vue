<template>
  <button class="checkout-button">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'checkout-button',
  props: {
    label: String,
  },
}
</script>

<style lang="scss">
.checkout-button {
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 3px;
  background-color: #54A3FF;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}
</style>