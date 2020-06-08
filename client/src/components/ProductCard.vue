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

    <p class="product-card__add-cart" @click="$emit('addToCart', product)">
      adicionar ao carrinho
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
  margin-bottom: 40px;

  &:hover {
    .product-card__price,
    .product-card__title {
      display: none;
    }

    .product-card__add-cart {
      display: block;
    }
  }
  
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

  &__price,
  &__add-cart {
    color: #3486E6;
  }

  &__add-cart {
    display: none;
    margin-top: 25px;
    cursor: pointer;
  }
}
</style>