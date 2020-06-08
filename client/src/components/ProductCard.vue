<template>
  <div class="product-card">
    <div class="product-card__image">
      <img :src="getImage(product.image)" :alt="product.name">
    </div>

    <p class="product-card__title">
      {{ product.name }}
    </p>

    <p class="product-card__price">
      R$ {{ product.price }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'product-card',
  props: {
    product: Object,
  },
  methods: {
    getImage(image) {
      return require(`../assets/images/${image}`)
    }
  }
}
</script>

<style lang="scss">
.product-card {
  width: 262px;
  
  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 230px;
    margin-bottom: 10px;
    border-radius: 3px;
    background-color: #eeeeee;
  
    img {
      max-width: 180px;
      max-height: 180px;
    }
  }
}
</style>