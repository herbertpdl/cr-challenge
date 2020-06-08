<template>
  <div class="shop">
    <div class="container">
      <div class="product-list">
        <product-card
          v-for="(product, index) in products"
          :key="index"
          :product="product"
          @addToCart="addItemToCart"
        />
      </div>
      
      <cart :items="cartItems" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import Cart from '@/components/Cart'
import ProductCard from '@/components/ProductCard'

import { getProducts } from '@/services/index.js'

export default {
  name: 'shop',
  components: {
    Cart,
    ProductCard,
  },
  data() {
    return {
      products: [],
    }
  },
  computed: {
    ...mapGetters(['cartItems'])
  },
  mounted() {
    getProducts()
      .then(resp => {
        this.products = resp
      })
  },
  methods: {
    // map `this.handleCartItems()` to `this.$store.dispatch('handleCartItems')`
    ...mapActions(['handleCartItems']),
    addItemToCart(item) {
      this.handleCartItems({ type: 'add', item})
    }
  }
}
</script>

<style lang="scss">
.shop {
  width: 100%;
}

.container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 70px 0 70px;
  box-sizing: border-box;
}

.product-list {
  width: 100%;
  display: grid;
  grid-template-columns: 260px 260px 260px;
  justify-content: space-between;
  margin-right: 30px;
}
</style>