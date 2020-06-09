import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Cart from '@/components/Cart'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Tests for Cart', () => {
  let wrapper = null
  let actions
  let store

  beforeEach(() => {
    actions = {
      handleCartItems: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Should render the component with empty values', () => {
    wrapper = shallowMount(Cart)
    
    const cartTitle = wrapper.find('.cart__title')
    const emptyCartImage = wrapper.find('.cart__empty-image')
    const cartItemsList = wrapper.find('.cart-items__listy')

    // validate if cart isn't showing quantity
    expect(cartTitle.find('span').exists()).toBe(false)

    // validate if empty card message is rendered
    expect(emptyCartImage.exists()).toBe(true)

    // validate if cart items list is not rendered
    expect(cartItemsList.exists()).toBe(false)
  })

  it('Should render the items list and prices', () => {
    wrapper = shallowMount(Cart, {
      propsData: {
        items: [
          {
            id: 74,
            name: 'Shards of Darkness',
            price: 71.94,
            score: 400,
            image: 'shards-of-darkness.png'
          },
          {
            id: 501,
            name: 'Horizon Zero Dawn',
            price: 115.8,
            score: 290,
            image: 'horizon-zero-dawn.png'
          },
          {
            id: 99,
            name: 'Call Of Duty WWII',
            price: 249.99,
            score: 205,
            image: 'call-of-duty-wwii.png'
          }
        ]
      }
    })

    const cartItem = wrapper.findAll('.item').at(0)

    // validate rendered item quantity
    expect(wrapper.findAll('.item').length).toEqual(3)

    // validate item values
    expect(cartItem.find('.name').text()).toBe('Shards of Darkness')
    expect(cartItem.find('.price').text()).toBe('R$ 71.94')

    // validate cart values
    expect(wrapper.find('.subtotal__price').text()).toBe('R$ 437.73')
    expect(wrapper.find('.freigth__price').text()).toBe('R$ 0.00')
    expect(wrapper.find('.total__price').text()).toBe('R$ 437.73')
  })

  it('Should show freigth value when subtotal < R$ 250', () => {
    wrapper = shallowMount(Cart, {
      propsData: {
        items: [
          {
            id: 74,
            name: 'Shards of Darkness',
            price: 71.94,
            score: 400,
            image: 'shards-of-darkness.png'
          },
          {
            id: 501,
            name: 'Horizon Zero Dawn',
            price: 115.8,
            score: 290,
            image: 'horizon-zero-dawn.png'
          },
        ]
      }
    })

    // validate if has freigth price
    expect(wrapper.find('.freigth__price').text()).toBe('R$ 20.00')
  })

  it('Should dispatch handleCartItems when clicking remove item button', () => {
    wrapper = shallowMount(Cart, {
      propsData: {
        items: [
          {
            id: 74,
            name: 'Shards of Darkness',
            price: 71.94,
            score: 400,
            image: 'shards-of-darkness.png'
          },
          {
            id: 501,
            name: 'Horizon Zero Dawn',
            price: 115.8,
            score: 290,
            image: 'horizon-zero-dawn.png'
          },
        ]
      },
      store,
      localVue 
    })

    const removeButton = wrapper.findAll('.item').at(0).find('.cart__items-list--remove')

    // validate if remove button exists
    expect(removeButton.exists()).toBe(true)

    removeButton.trigger('click')

    // validate if action was called
    expect(actions.handleCartItems).toHaveBeenCalled()
  })
})