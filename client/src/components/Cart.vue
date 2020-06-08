<template>
  <div class="cart">
    <p>
      Carrinho
      <span v-if="items.length">
        ({{ items.length }} itens)
      </span>
    </p>

    <div v-if="!items.length" class="cart__empty-image">
      <img src="../assets/images/cart-icon.svg" alt="cart icon" >
      <p>
        Até o momento,<br/> o seu carrinho está vazio
      </p>
    </div>

    <div v-if="items.length" class="cart__items-list">
      <div
        v-for="(item, index) in items"
        :key="`cart-${index}`"
      >
        <div class="cart__items-list--image">
          <img :src="getImage(item.image)" :alt="item.name">
        </div>

        <div class="cart__items-list--info">
          <p>
            {{ item.name }}
          </p>
          <p>
            {{ item.price }}
          </p>
        </div>

        <span class="cart__items-list--remove" @click="removeItemFromCart(item)">
          x
        </span>
      </div>

      <div>
        <p>Subtotal</p>
        <p>
          R$ {{ subTotalPrice.toFixed(2) }}
        </p>
      </div>

      <div>
        <p>Frete</p>
        <p>
          R$ {{ deliveryPrice.toFixed(2) }}
        </p>
      </div>

      <div>
        <p>Total</p>

        <p>
          {{ totalPrice.toFixed(2) }}
        </p>
      </div>

      <checkout-button label="finalizar compra" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import CheckoutButton from '@/components/CheckoutButton'

export default {
  name: 'cart',
  props: {
    items: Array,
  },
  components: {
    CheckoutButton,
  },
  computed: {
    subTotalPrice() {
      // If has more than 1 item, sum all prices
      if (this.items.length > 1) {
        return this.items.reduce((acumulator, item) => acumulator + item.price, 0)
      }

      // Return item price
      return this.items[0].price || null
    },
    deliveryPrice() {
      // Delivery is free if the total amount is greater than R$250
      if (this.subTotalPrice > 250) {
        return 0.00
      }

      return this.items.length * 10.00
    },
    totalPrice() {
      return this.subTotalPrice + this.deliveryPrice
    }
  },
  methods: {
    // map `this.handleCartItems()` to `this.$store.dispatch('handleCartItems')`
    ...mapActions(['handleCartItems']),
    getImage(image) {
      return require(`../assets/images/${image}`)
    },
    removeItemFromCart(item) {
      this.handleCartItems({type: 'remove', item})
    }
  }
}
</script>

<style lang="scss">
.cart {
  width: 260px;
  min-height: 325px;
  padding: 25px;
  border: 1px solid #E1E1E1;
  border-radius: 3px;
  text-align: left;

  p {
    margin: 0;
  }

  &__empty-image {
    width: 100%;
    padding-top: 55px;
    text-align: center;

    img {
      display: block;
      width: 90px;
      height: 72px;
      margin: 0 auto;
    }
  }

  &__items-list {
    padding-top: 20px;

    >div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      &:hover {
        .cart__items-list--remove {
          opacity: 1;
          pointer-events: initial;
        }
      }
    }

    &--image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 53px;
      margin-right: 10px;
      background-color: #EEEEEE;
      border-radius: 3px;
      
      img {
        max-width: 42px;
        max-height: 42px;
      }
    }
    
    &--info {
      margin-right: 10px;
      flex: 1;
    }
    
    &--remove {
      display: block;
      width: 15px;
      height: 15px;
      padding: 1px;
      background-color: #54A3FF;
      border-radius: 50%;
      color: #ffffff;
      font-size: 12px;
      text-align: center;
      opacity: 0;
      pointer-events: none;
      cursor: pointer;
    }
  }
}
</style>