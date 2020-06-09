import { shallowMount } from '@vue/test-utils'

import ProductCard from '@/components/ProductCard'

describe('Tests for ProductCard', () => {
  // mount component with product prop
  const wrapper = shallowMount(ProductCard, {
    propsData: {
      product: {
        id: 74,
        name: "Shards of Darkness",
        price: 71.94,
        score: 400,
        image: "shards-of-darkness.png"
      }
    }
  })

  it('Should have the right initial values', () => {
    const productTitle = wrapper.find('.product-card__title')
    const productPrice = wrapper.find('.product-card__price')
    
    // validate product title
    expect(productTitle.text()).toBe('Shards of Darkness')

    // validate product price
    expect(productPrice.text()).toBe('R$ 71.94')
  })

  it('Should emmit add to cart event', () => {
    const addToCart = wrapper.find('.product-card__add-cart')

    // simulate click in add to cart element
    addToCart.trigger('click')

    // validate if component emmited addTocCart
    expect(wrapper.emitted('addToCart')).toBeTruthy()
    
    // validate if component emmited addToCart just once
    expect(wrapper.emitted('addToCart').length).toBe(1)

    // validate emmited value
    expect(wrapper.emitted('addToCart')[0]).toEqual([wrapper.vm.product])
  })

})