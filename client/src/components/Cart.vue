<template>
  <div class="cart">
    <p class="cart__title">
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
      <div>
        <div
          v-for="(item, index) in items"
          :key="`cart-${index}`"
          class="item"
        >
          <div class="cart__items-list--image">
            <img :src="getImage(item.image)" :alt="item.name">
          </div>

          <div class="cart__items-list--info">
            <p class="name">
              {{ item.name }}
            </p>
            <p class="price">
              R$ {{ item.price }}
            </p>
          </div>

          <span class="cart__items-list--remove" @click="removeItemFromCart(item)">
            x
          </span>
        </div>
      </div>

      <div class="subtotal">
        <p>Subtotal</p>
        <p class="subtotal__price">
          R$ {{ subTotalPrice.toFixed(2) }}
        </p>
      </div>

      <div class="freigth">
        <p>Frete</p>
        <p class="freigth__price">
          R$ {{ deliveryPrice.toFixed(2) }}
        </p>
      </div>

      <div class="total">
        <p>Total</p>

        <p class="total__price">
          R$ {{ totalPrice.toFixed(2) }}
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
  border-radius: 4px;
  text-align: left;

  p {
    margin: 0;
  }

  &__title {
    font-size: 18px;
    font-weight: bold;

    span {
      color: #7F7575;
      font-size: 14px;
      font-weight: normal;
      margin-left: 5px;
    }
  }

  &__empty-image {
    width: 100%;
    padding-top: 55px;
    text-align: center;

    img {
      display: block;
      width: 90px;
      height: 72px;
      margin: 0 auto 15px auto;
    }

    p {
      color: #746A6A;
      font-size: 14px;
    }
  }

  &__items-list {
    padding-top: 20px;

    >div {
      max-height: 200px;
      margin-bottom: 20px;
      overflow: auto;
    }

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;

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

      .name {
        color: #7F7575;
        font-size: 14px;
      }

      .price {
        font-size: 14px;
        font-weight: bold;
      }
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
      line-height: 100%;
      opacity: 0;
      pointer-events: none;
      cursor: pointer;
    }

    .subtotal,
    .freigth,
    .total {
      color: #7F7575;
      font-size: 14px;
    }

    .subtotal__price,
    .freigth__price {
      color: #423B3B;
      font-size: 16px;
      font-weight: bold;
    }

    .total__price {
      color: #423B3B;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>