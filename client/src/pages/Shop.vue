<template>
  <div class="shop">
    <div class="container">
      <div class="product-list">
        <div class="product-list__heading">
          <h1>Games</h1>

          <dropdown v-model="orderBy" />
        </div>

        <div class="product-list__items">
          <product-card
            v-for="(product, index) in products"
            :key="index"
            :product="product"
            @addToCart="addItemToCart"
          />
        </div>
      </div>
      
      <cart :items="cartItems" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import Cart from '@/components/Cart'
import Dropdown from '@/components/Dropdown'
import ProductCard from '@/components/ProductCard'

import { getProducts } from '@/services/index.js'

export default {
  name: 'shop',
  components: {
    Cart,
    Dropdown,
    ProductCard,
  },
  data() {
    return {
      products: [],
      orderBy: '',
    }
  },
  watch: {
    orderBy(newValue) {
      this.reorderProducts(newValue)
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
    ...mapActions(['handleCartItems']),
    addItemToCart(item) {
      this.handleCartItems({ type: 'add', item})
    },
    reorderProducts(key) {
      // Function used to compare array items
      const compareByKey = (a, b) => {
        if (a[key] < b[key]) {
        return -1
        } else if (a[key] > b[key]) {
          return 1
        }

        return 0
      }

      this.products.sort(compareByKey)
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
  margin-right: 30px;

  .product-list__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 55px;

    h1 {
      margin: 0;
    }
  }

  .product-list__items {
    width: 100%;
    display: grid;
    grid-template-columns: 260px 260px 260px;
    justify-content: space-between;
  }
}
</style>