<template>
  <div class="cart">
    <p>Carrinho</p>

    <img src="../assets/images/cart-icon.svg" alt="cart icon">
  </div>
</template>

<script>
export default {
  name: 'cart',
  props: {
    items: Array,
  },
}
</script>

<style lang="scss">
.cart {
  width: 260px;
  min-height: 325px;
  padding: 25px;
  border: 1px solid #E1E1E1;
  border-radius: 3px;
}
</style>